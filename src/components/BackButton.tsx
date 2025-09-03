"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MoveLeft } from "lucide-react";

export default function BackButton({
  iconClassName,
}: {
  iconClassName?: string;
}) {
  const router = useRouter();
  return (
    <button
      className={cn(
        "rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100",
        iconClassName,
      )}
      onClick={() => router.back()}
    >
      <MoveLeft className="size-6 text-gray-900" />
    </button>
  );
}
