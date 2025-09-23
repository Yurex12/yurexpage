import { cn } from "@/lib/utils";
import { MessageCircleHeart } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

export function Logo({ className }: ComponentProps<"a">) {
  return (
    <Link
      href="/"
      className={cn(
        "font-bond text-primary flex items-center justify-center gap-x-1 text-xl font-bold uppercase",
        className,
      )}
    >
      <MessageCircleHeart size={30} />
      Yurexpage
    </Link>
  );
}
