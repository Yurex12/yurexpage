"use client";

import { MessageCircle, MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostInteractions from "./PostInteractions";
import TextExpander from "./TextExpander";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

const slides: { src: string }[] = [{ src: "/yusuf.jpg" }, { src: "/c.jpg" }];

const mobileCommentBoxHeight = 200;

export default function MobilePostDetials() {
  const [text, setText] = useState("");
  const textArearef = useRef<HTMLTextAreaElement>(null);

  const ref = useScrollRestoration<HTMLDivElement>();

  const handleText = (value: string) => setText(value);

  const handleAutoFocus = () => textArearef.current?.focus();

  const router = useRouter();

  return (
    <div className="auto mx-auto flex h-full flex-col sm:max-w-160">
      {/* Header */}
      <div className="flex w-full items-center gap-x-3 border-b border-b-gray-200 bg-white px-2 py-2">
        <button
          className="rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100"
          onClick={() => router.back()}
        >
          <MoveLeft className="size-6 text-gray-900" />
        </button>

        <span>Post</span>
      </div>

      <div className="flex-1 overflow-y-auto py-2" ref={ref}>
        <PostHeader />
        <TextExpander
          className="mt-2 px-4"
          text="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit."
        />
        {/* image */}
        <PostImage images={slides} />

        <div className="mt-2 space-y-2">
          <EngagementStats />
          <PostInteractions className="border-y border-gray-400 py-1">
            <button
              className="text-muted-foreground flex w-1/2 items-center justify-center space-x-2 rounded-md py-2 hover:bg-gray-100"
              onClick={handleAutoFocus}
            >
              <MessageCircle className="size-5" />
              <span className="text-sm">Comment</span>
            </button>
          </PostInteractions>
          <CommentList />
        </div>
      </div>
      <CommentBox
        text={text}
        handleText={handleText}
        maxTextAreaHeight={mobileCommentBoxHeight}
        ref={textArearef}
      />
    </div>
  );
}
