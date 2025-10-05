"use client";

import { usePost } from "@/contexts/PostContext";
import Link from "next/link";
import { UserAvatar } from "./UserAvatar";

export default function UserDetails() {
  const {
    user: { displayUsername, name, image },
  } = usePost();

  return (
    <Link href="/profile">
      <div className="flex items-center space-x-3">
        {image ? (
          <UserAvatar alt={name} url={image} fallback={name.slice(0, 1)} />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-700">
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <p className="font-medium text-gray-800">{name}</p>
          <p className="text-muted-foreground text-xs">@{displayUsername}</p>
        </div>
      </div>
    </Link>
  );
}
