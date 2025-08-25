"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100"
      onClick={() => router.back()}
    >
      <MoveLeft className="size-6 text-gray-900" />
    </button>
  );
}
