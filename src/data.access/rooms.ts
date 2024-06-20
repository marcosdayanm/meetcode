import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { eq, like } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { unstable_noStore } from "next/cache";

export function getRooms(search: string | undefined) {
  // acá teníamos lo de unstable_noStore() para que no se guarde en cache, pero es mejor práctica ponerlo en donde se llame la función para tener esa layer of abstraction entre next y tipo esto que es acceso a la base de datos
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  return db.query.room.findMany({ where });
}

export async function getUserRooms() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  const where = eq(room.userId, session.user.id);
  return db.query.room.findMany({ where });
}

export function getRoom(roomId: string) {
  // igual acá lo de unstable
  return db.query.room.findFirst({ where: eq(room.id, roomId) });
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  await db.insert(room).values({ ...roomData, userId });
}

export async function editRoom(roomData: Room) {
  await db.update(room).set(roomData).where(eq(room.id, roomData.id));
}
