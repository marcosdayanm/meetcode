"use server";

import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log(session);
  if (!session) {
    throw new Error("You must be logged in to create this room");
  }

  await db.insert(room).values({ ...roomData, userId: session?.user.id });

  revalidatePath("/"); // Ésto es par alimpiar el cache para que cuando se cargue la página,s e carguen los últimos cambios
}
