import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export function getRooms() {
  unstable_noStore(); // Así se marc auna función como dinámica para que no se guarde el cache y que se considere como página dinámica una página que tiene acceso de una API
  return db.query.room.findMany();
}
