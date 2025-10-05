import { Ref, RefObject } from "react";

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (el: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(el);
      } else {
        (ref as RefObject<T | null>).current = el;
      }
    });
  };
}
export const formatCount = (count: number) => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
  return count;
};

export function getLikeLabel(count: number, liked: boolean) {
  if (count === 0) return "";

  if (liked) {
    if (count === 1) return "You";
    return `You and ${count - 1} other${count - 1 > 1 ? "s" : ""}`;
  }

  return count.toString();
}
