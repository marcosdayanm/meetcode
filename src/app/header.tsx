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

  return (
    <header className="bg-gray-200 py-2 dark:bg-gray-900 container mx-auto">
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

        <div className="flex items-center gap-4">
          {session.data && <AccountDropdown />}
          {!session.data && (
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
