"use client";
import { ThumbsUp } from "lucide-react";

import { usePost } from "@/contexts/PostContext";

import { formatCount, getLikeLabel } from "@/lib/helpers";

export default function EngagementStats() {
  const {
    _count: { comments: commentsCount, postLikes: postLikesCount },
    postLikes,
    optimisticLike,
  } = usePost();

  const originallyLiked = postLikes.length > 0;

  const displayLikes = (() => {
    if (optimisticLike && !originallyLiked) return postLikesCount + 1; // Just liked
    if (!optimisticLike && originallyLiked)
      return Math.max(postLikesCount - 1, 0); // Just unliked
    return postLikesCount; // No change
  })();

  if (displayLikes === 0 && commentsCount === 0) return null;

  return (
    <div className="text-muted-foreground flex items-center justify-between px-4 text-sm">
      {displayLikes > 0 && (
        <div className="flex items-center space-x-1">
          <ThumbsUp className="size-5 text-blue-500" fill="currentColor" />
          <span>{getLikeLabel(displayLikes, optimisticLike)}</span>
        </div>
      )}

      {commentsCount > 0 && (
        <span className="cursor-pointer hover:underline">
          {formatCount(commentsCount)} comments
        </span>
      )}
    </div>
  );
}
