"use client";
import { useState } from "react";

import { MessageCircle } from "lucide-react";

import PostCommentSection from "./PostCommentSection";
import PostInteractions from "./PostInteractions";

import { MOBILE_DEVICE_BREAKPOINT } from "@/constants";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "./ui/dialog";

export default function EngagementActions() {
  const [text, setText] = useState("");
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const router = useRouter();

  const handleText = (value: string) => setText(value);

  const handleConfirmationDialog = () =>
    setOpenConfirmationDialog((open) => !open);

  function handleLeavePost() {
    setOpenConfirmationDialog(false);
    setOpenCommentDialog(false);
    setText("");
  }

  function handleCommentDialog() {
    if (openCommentDialog === true) {
      if (text.trim()) {
        setOpenConfirmationDialog(true);
      } else {
        setText("");
        setOpenCommentDialog(false);
      }
      return;
    }
    setOpenCommentDialog(true);
  }

  function handleComment() {
    if (window.innerWidth >= MOBILE_DEVICE_BREAKPOINT)
      setOpenCommentDialog(true);
    else router.push("/post/1");
  }

  return (
    <div className="space-y-2 px-4">
      {/* Actions */}
      <PostInteractions>
        <Dialog open={openCommentDialog} onOpenChange={handleCommentDialog}>
          <button
            className="text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100"
            onClick={handleComment}
          >
            <MessageCircle className="size-5" />
            <span className="text-sm">Comment</span>
          </button>

          <DialogContent
            className="flex h-11/12 w-full flex-col gap-y-0 p-0 2xl:max-w-2xl"
            showCloseButton={false}
          >
            <PostCommentSection
              openConfirmationDialog={openConfirmationDialog}
              handleText={handleText}
              text={text}
              handleLeavePost={handleLeavePost}
              handleConfirmationDialog={handleConfirmationDialog}
            />
          </DialogContent>
        </Dialog>
      </PostInteractions>
    </div>
  );
}
