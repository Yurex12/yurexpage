"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { PostProvider } from "@/contexts/PostContext";

import EngagementStats from "./EngagementStats";
import PostCommentDialog from "./PostCommentDialog";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInteraction from "./PostInteraction";
import TextExpander from "./TextExpander";

import { PostWithRelations } from "@/types/types";

import { MOBILE_DEVICE_BREAKPOINT } from "@/constants";
import { Dialog } from "./ui/dialog";

export default function Post({ post }: { post: PostWithRelations }) {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const router = useRouter();

  function handleCommentClick() {
    if (window.innerWidth >= MOBILE_DEVICE_BREAKPOINT) {
      setOpenCommentDialog(true);
    } else {
      router.push(`/post/${post.id}`);
    }
  }

  console.log("rerendered");

  return (
    <PostProvider post={post}>
      <div className="max-w-140 space-y-2 rounded-lg bg-white pt-4 pb-2 sm:space-y-3 sm:not-first:shadow">
        <PostHeader />

        <TextExpander className="px-4" />
        <PostImage />
        <EngagementStats />
        <div className="hidden rounded-lg border border-gray-200 sm:block"></div>
        <PostInteraction onClickComment={handleCommentClick} />
      </div>

      <Dialog open={openCommentDialog} onOpenChange={setOpenCommentDialog}>
        <PostCommentDialog onClose={() => setOpenCommentDialog(false)} />
      </Dialog>
    </PostProvider>
  );
}
