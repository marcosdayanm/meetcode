"use server";

import { editRoom, getRoom } from "@/data.access/rooms";
import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();
  if (!session) {
    throw new Error("You must be logged in to create this room");
  }

  const room = await getRoom(roomData.id);

  if (room?.userId !== session.user.id) {
    throw new Error("You are not the owner of this room");
  }

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms"); // Ésto es par alimpiar el cache para que cuando se cargue la página,s e carguen los últimos cambios
  revalidatePath(`/edit-room/${roomData.id}`);
  redirect("/your-rooms");
}
