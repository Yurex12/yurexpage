"use client";
import { MessageCircle } from "lucide-react";

export default function CommentPostBtn({ onClick }: { onClick: VoidFunction }) {
  return (
    <button
      className="text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100"
      onClick={onClick}
    >
      <MessageCircle className="size-5" />
      <span className="text-sm">Comment</span>
    </button>
  );
}
