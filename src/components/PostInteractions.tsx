"use client";

import { ThumbsUp } from "lucide-react";
import { ReactNode, useState } from "react";

function PostInteractions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={() => setLiked(!liked)}
        className={`text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100`}
      >
        <ThumbsUp className={`h-5 w-5 ${liked ? "fill-blue-500" : ""}`} />
        <span className="text-sm">Like</span>
      </button>

      {children}
    </div>
  );
}

export default PostInteractions;
