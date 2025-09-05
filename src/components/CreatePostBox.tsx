"use client";

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";

import { Image as ImageType } from "@/types/types";
import CreatePostFooter from "./CreatePostFooter";
import ImageUploader from "./ImageUploader";
import CreatePostImagePreviews from "./CreatePostImagePreviews";

export default function CreatePostBox() {
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log("Post submitted:", { text, images });
      setText("");
      setImages([]);
    }
    textareaRef.current!.style.height = "auto";
  };

  const handleAutoResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  function handleFocus(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.target === e.currentTarget) textareaRef.current?.focus();
  }

  return (
    <div className="mt-2 flex h-11/12 flex-col gap-y-2 px-4 sm:px-8">
      <h1 className="text-2xl">Create Post</h1>

      <div
        className="flex-1 cursor-text overflow-auto rounded-md border border-slate-300 p-2"
        onClick={handleFocus}
      >
        <textarea
          value={text}
          ref={textareaRef}
          onChange={handleAutoResizeTextarea}
          placeholder="What's on your mind?"
          className="w-full resize-none bg-transparent leading-relaxed font-normal text-gray-900 outline-none placeholder:text-gray-500"
          rows={1}
        />

        <CreatePostImagePreviews images={images} setImages={setImages} />
      </div>

      <ImageUploader images={images} setImages={setImages} />

      <CreatePostFooter
        text={text}
        imageLength={images.length}
        handleUploadPost={handleSubmit}
      />
    </div>
  );
}
