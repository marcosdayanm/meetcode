"use server";

import { deleteRoom, getRoom } from "@/data.access/rooms";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }

  const room = await getRoom(roomId);

  if (room?.userId !== session.user.id) {
    throw new Error("You are not the owner of this room");
  }

  await deleteRoom(roomId);

  revalidatePath("/your-rooms"); // para que se relodee el path
}
