"use client";

import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import CreatePost from "./CreatePost";
import Post from "./Post";

export default function Posts() {
  const ref = useScrollRestoration<HTMLDivElement>();

  return (
    <div
      className="scrollbar-hide flex-1 space-y-2 overflow-y-scroll pb-4 sm:space-y-4"
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

// sm:pt-4 xl:mt-4 xl:pt-0
