"use client";
import { usePost } from "@/contexts/PostContext";
import { ThumbsUp } from "lucide-react";

export default function LikePostBtn() {
  const { optimisticLike, handleLike } = usePost();

  return (
    <button
      onClick={handleLike}
      className="text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100"
    >
      <ThumbsUp
        className={`h-5 w-5 ${optimisticLike ? "fill-blue-500" : ""}`}
      />
      <span className="text-sm">Like</span>
    </button>
  );
}
