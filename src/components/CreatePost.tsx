"use client";
import { ComponentProps, useState } from "react";

import { ImageIcon } from "lucide-react";

import ConfirmAction from "./ConfirmAction";
import CreatePostDialog from "./CreatePostDialog";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

import { MOBILE_DEVICE_BREAKPOINT } from "@/constants";
import { Image } from "@/types/types";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function CreatePost({ className }: ComponentProps<"div">) {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const router = useRouter();

  const handleConfirmationDialog = () =>
    setOpenConfirmationDialog((open) => !open);

  function handlePostDialog() {
    if (openPostDialog === true) {
      if (text.trim() || images.length) {
        setOpenConfirmationDialog(true);
      } else {
        setText("");
        setOpenPostDialog(false);
      }
      return;
    }
    setOpenPostDialog(true);
  }

  function handleLeavePost() {
    setOpenConfirmationDialog(false);
    setOpenPostDialog(false);
    setText("");
    setImages([]);
  }

  function handleImageUpload() {
    setOpenPostDialog(true);
  }

  function handleCreatePost() {
    if (window.innerWidth > MOBILE_DEVICE_BREAKPOINT) handlePostDialog();
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
          <Dialog open={openPostDialog} onOpenChange={handlePostDialog}>
            <button
              className="w-full resize-none rounded-full bg-gray-100 px-4 py-2 text-start text-gray-600 placeholder-gray-500 outline-none hover:cursor-pointer"
              onClick={handleCreatePost}
            >
              What&apos;s on your mind, Ade?
            </button>

            <DialogContent
              className="flex max-h-10/12 flex-col border-0 p-4 outline-0"
              showCloseButton={false}
            >
              <DialogTitle className="sr-only">Post Modal</DialogTitle>
              <CreatePostDialog
                text={text}
                setText={setText}
                images={images}
                setImages={setImages}
              />
            </DialogContent>
          </Dialog>
          {/* Image Upload Icon */}
          <button
            className="cursor-pointer text-gray-500 transition hover:text-blue-600"
            onClick={handleImageUpload}
          >
            <label htmlFor="upload-image" className="cursor-pointer">
              <ImageIcon className="h-full" />
            </label>
            <input
              id="upload-image"
              type="file"
              className="hidden"
              accept="multiple"
            />
          </button>
        </div>
      </div>

      <ConfirmAction
        open={openConfirmationDialog}
        name="post"
        handleLeavePost={handleLeavePost}
        handleConfirmationDialog={handleConfirmationDialog}
      />
    </>
  );
}
