"use client";
import { useState } from "react";

import { DESKTOP_BREAKPOINT } from "@/constants";
import { usePost } from "@/contexts/PostContext";

export default function TextExpander({ className }: { className?: string }) {
  const { content } = usePost();
  const [showFullText, setShowFullText] = useState(false);

  if (!content?.trim()) return null;

  const words = content.trim().split(" ");
  const wordLimit = 30;
  const isLong = words.length > wordLimit;

  function handleClick() {
    if (window.innerWidth <= DESKTOP_BREAKPOINT) {
      setShowFullText(true);
    }
  }

  return (
    <p
      className={`${className} cursor-pointer lg:cursor-auto`}
      onClick={handleClick}
    >
      {isLong
        ? showFullText
          ? content
          : words.slice(0, wordLimit).join(" ") + "... "
        : content}
      {isLong && (
        <span
          className="content-blue-400 ml-1 cursor-pointer italic underline"
          onClick={() => setShowFullText(true)}
        >
          {!showFullText && "show more"}
        </span>
      )}
    </p>
  );
}
