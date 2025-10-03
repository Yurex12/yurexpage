"use client";
import { X } from "lucide-react";

import { DialogClose } from "@radix-ui/react-dialog";

export default function CommentDialogHeader() {
  return (
    <div className="flex w-full items-center bg-white px-2 py-4 shadow-sm">
      <h2 className="flex flex-1 items-center justify-center text-lg font-bold text-gray-900">
        Yusuf&apos;s Post
      </h2>
      <DialogClose className="rounded-full border-0 bg-white p-2 outline-0 transition-colors hover:bg-gray-100">
        <X className="h-5 w-5 text-gray-900" />
      </DialogClose>
    </div>
  );
}
