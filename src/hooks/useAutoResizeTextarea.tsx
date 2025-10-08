import { useRef } from "react";

export default function useAutoResizeTextarea(maxHeight: number = 200) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleTextAreaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      if (textarea.scrollHeight > maxHeight) {
        textarea.style.height = `${maxHeight}px`;
        textarea.style.overflowY = "scroll";
      } else {
        textarea.style.height = `${textarea.scrollHeight}px`;
        textarea.style.overflowY = "hidden";
      }
    }
  };

  return {
    textareaRef,
    handleTextAreaHeight,
    height: textareaRef.current?.scrollHeight,
  };
}
