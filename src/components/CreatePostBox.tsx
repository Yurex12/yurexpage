"use client";

import { useForm } from "react-hook-form";
import CreatePostForm from "./CreatePostForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, TPostSchema } from "@/lib/schemas/postSchema";
import { MouseEvent, RefObject } from "react";

export default function CreatePostBox() {
  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      images: [],
    },
  });

  function handleFocus(
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    el: RefObject<HTMLTextAreaElement | null>,
  ) {
    if (e.target === e.currentTarget) el.current?.focus();
  }

  return (
    <div className="mt-2 flex h-11/12 flex-col gap-y-2 px-4 sm:px-8">
      <h1 className="text-2xl">Create Post</h1>

      <CreatePostForm
        containerClassName="rounded-md border border-slate-300 p-2 cursor-text"
        form={form}
        handleFocus={handleFocus}
      />
    </div>
  );
}
