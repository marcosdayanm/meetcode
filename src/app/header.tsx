"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
          {session.data?.user?.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className="mr-2" /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  const isLoggedIn = session.data;

  return (
    // Eso de z-10 y relative en el header es para que el componente esté tipo hasta arriba
    <header className="bg-gray-200 py-2 dark:bg-gray-900 container mx-auto z-10 relative">
      <div className="flex justify-between">
        <Link
          href="/"
          className="flex gap-2 items-center text-xl hover:text-blue-700"
        >
          {" "}
          <Image
            src="/logo.png"
            width={75}
            height={60}
            alt="meetcode logo"
            priority
          />
          MeetCode
        </Link>

        {isLoggedIn && (
          <nav className="flex gap-4">
            <Link className="hover:underline" href="/browse">
              Browse
            </Link>

            <Link className="hover:underline" href="/your-rooms">
              Your Rooms
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {isLoggedIn && <AccountDropdown />}
          {!isLoggedIn && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" /> Sign in
            </Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
