/* eslint-disable @next/next/no-img-element */
"use client";
import { ComponentProps, useState } from "react";

import { ImageIcon } from "lucide-react";

import { Dialog } from "./ui/dialog";

import { MOBILE_DEVICE_BREAKPOINT } from "@/constants";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CreatePostContainer from "./CreatePostContainer";

export default function CreatePost({ className }: ComponentProps<"div">) {
  const [openPostDialog, setOpenPostDialog] = useState(false);

  const router = useRouter();

  // function handleImageUpload() {
  //   setOpenPostDialog(true);
  // }

  function handleCreatePost() {
    if (window.innerWidth > MOBILE_DEVICE_BREAKPOINT) setOpenPostDialog(true);
    else router.push("/create-post");
  }

  return (
    <>
      <div
        className={cn(
          "flex w-auto items-center gap-3 rounded-xl bg-white px-4 py-3 sm:shadow-sm",
          className,
        )}
      >
        {/* Profile Picture */}
        <img
          src="/b.jpg"
          alt="User"
          className="size-10 rounded-full object-cover"
        />

        {/* Input Area */}
        <div className="flex flex-1 items-center gap-x-1">
          <button
            className="w-full resize-none rounded-full bg-gray-100 px-4 py-2 text-start text-gray-600 placeholder-gray-500 outline-none hover:cursor-pointer"
            onClick={handleCreatePost}
          >
            What&apos;s on your mind, Ade?
          </button>
          {/* Image Upload Icon */}
          <button
            className="cursor-pointer text-gray-500 transition hover:text-blue-600"
            // onClick={handleImageUpload}
          >
            <label htmlFor="upload-image" className="cursor-pointer">
              <ImageIcon className="h-full" />
            </label>
            <input
              id="upload-image"
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
            />
          </button>
        </div>
      </div>

      <Dialog open={openPostDialog} onOpenChange={setOpenPostDialog}>
        <CreatePostContainer onClose={() => setOpenPostDialog(false)} />
      </Dialog>
    </>
  );
}
