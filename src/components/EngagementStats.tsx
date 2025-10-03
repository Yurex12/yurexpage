"use client";
import { ThumbsUp } from "lucide-react";

function EngagementStats() {
  return (
    <div className="text-muted-foreground flex items-center justify-between px-4 text-sm">
      <div className="flex items-center space-x-1">
        <ThumbsUp className="size-5 text-blue-500" fill="currentColor" />
        <span>13 likes</span>
      </div>
      <span className="cursor-pointer hover:underline">15 comments</span>
    </div>
  );
}

export default EngagementStats;
