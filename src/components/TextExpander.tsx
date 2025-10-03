"use client";
import { useState } from "react";

import { DESKTOP_BREAKPOINT } from "@/constants";

export default function TextExpander({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const [showFullText, setShowFullText] = useState(false);

  if (!text?.trim()) return null;

  const words = text.trim().split(" ");
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
          ? text
          : words.slice(0, wordLimit).join(" ") + "... "
        : text}
      {isLong && (
        <span
          className="ml-1 cursor-pointer text-blue-400 italic underline"
          onClick={() => setShowFullText(true)}
        >
          {!showFullText && "show more"}
        </span>
      )}
    </p>
  );
}
