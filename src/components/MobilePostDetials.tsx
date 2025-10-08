"use client";

import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { useRef } from "react";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import EngagementStats from "./EngagementStats";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";

import { usePost } from "@/contexts/PostContext";
import { commentSchema, TCommentSchema } from "@/lib/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PageHeader from "./PageHeader";
import PostInteraction from "./PostInteraction";
import TextExpander from "./TextExpander";
import { useRouter } from "next/navigation";

export default function MobilePostDetials() {
  const textArearef = useRef<{ focus: VoidFunction }>(null);
  const { comments } = usePost();

  const ref = useScrollRestoration<HTMLDivElement>();

  const router = useRouter();

  const handleAutoFocus = () => textArearef.current?.focus();

  const form = useForm<TCommentSchema>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const handleUploaded = () => router.refresh();

  return (
    <div className="bg- mx-auto flex h-full flex-col rounded-sm sm:max-w-160 sm:border sm:border-gray-200">
      <PageHeader
        title="Post"
        containerClassName="gap-x-3 border-b border-b-gray-200 bg-transparent"
      />

      <div className="flex-1 overflow-y-auto py-2" ref={ref}>
        <PostHeader />
        <TextExpander className="mt-2 px-4" />
        <PostImage />

        <div className="mt-2 space-y-2">
          <EngagementStats />
          <PostInteraction onClickComment={handleAutoFocus} />
          <CommentList comments={comments} />
        </div>
      </div>

      <CommentBox ref={textArearef} form={form} onUploaded={handleUploaded} />
    </div>
  );
}

// className="border-y border-gray-400 py-1"
