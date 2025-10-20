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
import UpdatePostDialog from "./UpdatePostDialog";

export default function Post({ post }: { post: PostWithRelations }) {
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openUpdatePostDialog, setOpenUpdatePostDialog] = useState(false);

  const router = useRouter();

  console.log(openUpdatePostDialog, "updatepost");
  console.log(openCommentDialog, "Comment");

  function handleComment() {
    if (window.innerWidth >= MOBILE_DEVICE_BREAKPOINT) {
      setOpenCommentDialog(true);
    } else {
      router.push(`/post/${post.id}`);
    }
  }

  function handleUpdatePost() {
    if (window.innerWidth >= MOBILE_DEVICE_BREAKPOINT) {
      setOpenUpdatePostDialog(true);
    } else {
      router.push(`/post/edit/${post.id}`);
    }
  }

  return (
    <PostProvider post={post}>
      <div className="max-w-140 space-y-2 rounded-lg bg-white pt-4 pb-2 sm:space-y-3 sm:not-first:shadow">
        <PostHeader onUpdatePost={handleUpdatePost} />

        <TextExpander className="px-4" />
        <PostImage />
        <EngagementStats />
        <div className="hidden rounded-lg border border-gray-200 sm:block"></div>
        <PostInteraction onClickComment={handleComment} />
      </div>

      {/* Comment */}
      <Dialog
        open={openCommentDialog}
        onOpenChange={setOpenCommentDialog}
        key="comment"
      >
        {openCommentDialog && (
          <PostCommentDialog onClose={() => setOpenCommentDialog(false)} />
        )}
      </Dialog>

      {/* Edit post */}
      <Dialog
        open={openUpdatePostDialog}
        onOpenChange={setOpenUpdatePostDialog}
        key="updatePost"
      >
        {openUpdatePostDialog && (
          <UpdatePostDialog onClose={() => setOpenUpdatePostDialog(false)} />
        )}
      </Dialog>
    </PostProvider>
  );
}
