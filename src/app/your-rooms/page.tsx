import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { getUserRooms } from "@/data.access/rooms";
import { UserRoomCard } from "./user-room-card";
import { unstable_noStore } from "next/cache";

export default async function YourRoomsPage() {
  unstable_noStore(); // Así se marca una función como dinámica para que no se guarde el cache y que se considere como página dinámica una página que tiene acceso de una API
  const rooms = await getUserRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        {/* /El asChild es para que el botón se comporte como un hijo de un componente*/}

        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      {rooms.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {rooms.map((room) => {
            return <UserRoomCard key={room.id} room={room} />;
          })}
        </div>
      )}

      {rooms.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-4 mt-24">
          <Image src="/void.svg" width={300} height={300} alt="void" />
          <h2 className="text-3xl">
            No rooms yet, guess it&apos;s time to create one!
          </h2>
        </div>
      )}
    </main>
  );
}
