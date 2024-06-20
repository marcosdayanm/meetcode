import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "@/data.access/rooms";
import { SearchBar } from "./search-bar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore(); // Así se marca una función como dinámica para que no se guarde el cache y que se considere como página dinámica una página que tiene acceso de una API
  const rooms = await getRooms(searchParams.search);

  function RoomCard({ room }: { room: Room }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{room.name}</CardTitle>
          <CardDescription>
            s{room.tags} - {room.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TagsList tags={splitTags(room.tags)} />
          {room.remoteRepo && (
            <Link
              href={room.remoteRepo}
              className="flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
              Remote Repository
            </Link>
          )}
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/rooms/${room.id}`}>Join Room</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        {/* /El asChild es para que el botón se comporte como un hijo de un componente*/}

        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>

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
