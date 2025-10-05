"use client";

import { useClientSession } from "@/hooks/useClientSession";
import { likePost } from "@/lib/actions/postActions";
import { ThumbsUp } from "lucide-react";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

function PostInteractions({
  children,
  className,
  postId,
}: {
  children: ReactNode;
  className?: string;
  postId: string;
}) {
  const [liked, setLiked] = useState(false);
  const { user, isPending, isAuthenticated } = useClientSession();

  const userId = user?.id as string;

  async function handleLikePost() {
    console.log(postId, userId);

    const res = await likePost({ postId, userId });

    if (res.success) {
      if (res.type === "like") {
        setLiked(true);
      }
      if (res.type === "unlike") {
        setLiked(false);
      }
    } else {
      toast.error(res.message);
    }

    console.log(res);
  }

  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={handleLikePost}
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
