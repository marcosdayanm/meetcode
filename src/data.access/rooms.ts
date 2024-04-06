import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export function getRooms() {
  unstable_noStore(); // Así se marca una función como dinámica para que no se guarde el cache y que se considere como página dinámica una página que tiene acceso de una API
  return db.query.room.findMany();
}

export function getRoom(roomId: string) {
  unstable_noStore();
  return db.query.room.findFirst({ where: eq(room.id, roomId) });
}
