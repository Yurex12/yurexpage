"use client";
import { commentSchema, TCommentSchema } from "@/lib/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CommentBox from "./CommentBox";
import CommentDialogHeader from "./CommentDialogHeader";
import CommentImage from "./CommentImage";
import ConfirmAction from "./ConfirmAction";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";
import PostInteraction from "./PostInteraction";
import TextExpander from "./TextExpander";
import { Dialog, DialogContent } from "./ui/dialog";
import CommentsSection from "./CommentsSection";
import { usePost } from "@/contexts/PostContext";
import { useQueryClient } from "@tanstack/react-query";
import UpdatePostDialog from "./UpdatePostDialog";

export default function PostCommentDialog({
  onClose,
}: {
  onClose: VoidFunction;
}) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openUpdatePostDialog, setOpenUpdatePostDialog] = useState(false);

  const commentBoxRef = useRef<{ focus: VoidFunction }>(null);

  const { id: postId } = usePost();

  const form = useForm<TCommentSchema>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const content = form.watch("content");
  const isSubmitting = form.formState.isSubmitting;

  function handleDialogClose() {
    if (isSubmitting) return;

    if (content.trim().length > 0) {
      setOpenConfirmationDialog(true);
      return;
    }

    form.reset();
    onClose();
  }

  function handleConfirmedLeave() {
    setOpenConfirmationDialog(false);
    form.reset();
    onClose();
  }

  const handleComment = () => commentBoxRef.current?.focus();

  const queryClient = useQueryClient();

  function handleUploaded() {
    queryClient.invalidateQueries({
      queryKey: ["comments", postId],
    });
  }

  return (
    <DialogContent
      className="flex h-11/12 w-full flex-col gap-y-0 p-0 2xl:max-w-2xl"
      aria-describedby={undefined}
      showCloseButton={false}
      onInteractOutside={(e) => {
        e.preventDefault();
        handleDialogClose();
      }}
      onEscapeKeyDown={(e) => {
        e.preventDefault();
        handleDialogClose();
      }}
    >
      <CommentDialogHeader />
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: "leave",
            autoHideDelay: 300,
          },
        }}
        className="my-2 flex-1 overflow-scroll"
      >
        <PostHeader onUpdatePost={() => setOpenUpdatePostDialog(true)} />
        <TextExpander className="mt-2 px-4" />
        {/* image */}
        <CommentImage />
        <div className="mt-2 space-y-2">
          <EngagementStats />

          <PostInteraction onClickComment={handleComment} />

          <CommentsSection postId={postId} />
        </div>
      </OverlayScrollbarsComponent>

      <CommentBox ref={commentBoxRef} form={form} onUploaded={handleUploaded} />

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

      <ConfirmAction
        name="comment"
        open={openConfirmationDialog}
        onLeave={handleConfirmedLeave}
        onConfirmation={() => setOpenConfirmationDialog(false)}
      />
    </DialogContent>
  );
}
