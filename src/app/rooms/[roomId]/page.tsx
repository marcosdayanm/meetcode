import { getRoom } from "@/data.access/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { map } from "zod";
import { TagsList } from "@/components/tags-list";
import { MeetCodeVideo } from "./video-player";
import { splitTags } from "@/lib/utils";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
  // console.log(props);

  const roomId = props.params.roomId;

  unstable_noStore();
  const room = await getRoom(roomId);

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className=" col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <MeetCodeVideo room={room} />
        </div>
      </div>

      <div className=" col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex-col gap-4 space-y-4">
          <h1 className="text-base">{room?.name} </h1>

          {room?.remoteRepo && (
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

          <p className="text-base text-gray-600">{room?.description} </p>

          <TagsList tags={splitTags(room.tags)} />
        </div>
      </div>

      {/* <div>{room?.name}</div> */}
    </div>
  );
}
