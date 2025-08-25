"use client";

import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import { SendHorizonalIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle } from "react";

const CommentBox = forwardRef<
  HTMLTextAreaElement,
  {
    text: string;
    handleText: (value: string) => void;
    maxTextAreaHeight?: number;
  }
>(({ text, handleText, maxTextAreaHeight }, ref) => {
  const { textareaRef, handleInput } = useAutoResizeTextarea(
    maxTextAreaHeight ?? 300,
  );

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  useEffect(() => {
    textareaRef.current?.focus();
  });

  return (
    <div className="w-full rounded-xl bg-white p-4">
      <div className="relative flex items-start gap-3">
        <img src="/c.jpg" alt="logo" className="h-10 w-10 rounded-full" />

        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              handleText(e.target.value);
              handleInput();
            }}
            placeholder="Write a comment..."
            className="w-full resize-none rounded-lg bg-gray-100 p-3 pr-10 text-sm focus:outline-none"
          />

          {/* Send Button inside the box */}
          <button
            type="button"
            className="absolute right-5 bottom-4 text-blue-600 transition hover:text-blue-700"
          >
            <SendHorizonalIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
});

CommentBox.displayName = "CommentBox";

export default CommentBox;
