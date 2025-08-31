"use client";

import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import CreatePost from "./CreatePost";
import Post from "./Post";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default function Posts({ className }: ComponentProps<"div">) {
  const ref = useScrollRestoration<HTMLDivElement>();

  return (
    <div
      className={cn("flex-1 space-y-2 pb-4 sm:space-y-4", className)}
      ref={ref}
    >
      <CreatePost />
      <div className="space-y-2 sm:space-y-4">
        {[1, 2, 3, 4].map((num) => (
          <Post key={num} />
        ))}
      </div>
    </div>
  );
}
