"use client";
import { useRef } from "react";

import { MessageCircle } from "lucide-react";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

import CommentBox from "./CommentBox";
import CommentDialogHeader from "./CommentDialogHeader";
import CommentImage from "./CommentImage";
import CommentList from "./CommentList";
import ConfirmAction from "./ConfirmAction";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";
import PostInteractions from "./PostInteractions";
import TextExpander from "./TextExpander";

type PostCommentSectionProps = {
  openConfirmationDialog: boolean;
  text: string;
  handleText: (value: string) => void;
  handleLeavePost: VoidFunction;
  handleConfirmationDialog: VoidFunction;
};

export default function PostCommentSection({
  openConfirmationDialog,
  handleText,
  text,
  handleLeavePost,
  handleConfirmationDialog,
}: PostCommentSectionProps) {
  const slides: { src: string }[] = [{ src: "/yusuf.jpg" }, { src: "/c.jpg" }];

  const commentBoxRef = useRef<HTMLTextAreaElement | null>(null);
  const handleComment = () => commentBoxRef.current?.focus();

  return (
    <>
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
        <PostHeader />
        <TextExpander
          className="mt-2 px-4"
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit."
        />
        {/* image */}
        <CommentImage images={slides} />
        <div className="mt-2 space-y-2">
          <EngagementStats />
          <PostInteractions className="border-y border-gray-400 py-1">
            <button
              className="text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100"
              onClick={handleComment}
            >
              <MessageCircle className="size-5" />
              <span className="text-sm">Comment</span>
            </button>
          </PostInteractions>
          <CommentList />
        </div>
      </OverlayScrollbarsComponent>
      <CommentBox ref={commentBoxRef} text={text} handleText={handleText} />

      <ConfirmAction
        name="comment"
        open={openConfirmationDialog}
        handleLeavePost={handleLeavePost}
        handleConfirmationDialog={handleConfirmationDialog}
      />
    </>
  );
}
