"use client";
import { useState } from "react";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { ImageUploadResponse } from "@/types/types";

export default function PostImage({
  images,
}: {
  images: ImageUploadResponse[];
}) {
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const imageLength = images.length;

  const handleOpen = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };
  return (
    <>
      <div
        className={`mx-auto mt-2 grid w-full grid-cols-1 ${
          imageLength > 1 ? "grid-cols-2 gap-x-0.5" : ""
        }`}
      >
        {images.map((image, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image.url}
            alt={image.name}
            className={`w-full rounded-sm object-cover ${
              images.length > 1 ? "h-80" : "h-auto"
            }`}
            key={image.fileId}
            onClick={(e) => {
              e.stopPropagation();
              handleOpen(i);
            }}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={photoIndex}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
        styles={{
          container: {
            backgroundColor: "rgba(0, 0, 0, 0.99)",
          },
        }}
      />
    </>
  );
}
