import { DialogClose } from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export default function CreatePostHeader() {
  return (
    <div className="flex items-center justify-between border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
      <DialogClose asChild>
        <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </DialogClose>
    </div>
  );
}
