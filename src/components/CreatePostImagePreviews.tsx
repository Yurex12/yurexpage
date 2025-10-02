/* eslint-disable @next/next/no-img-element */
import { X } from "lucide-react";

import { MAX_IMAGE_SIZE } from "@/constants";

export default function CreatePostImagePreviews({
  images,
  disabled,
  removeImage,
}: {
  images: File[];
  disabled: boolean;
  removeImage: (file: File) => void;
}) {
  if (images.length === 0) return null;

  return (
    <div
      className={`mx-auto mt-1 grid w-full gap-1 ${
        images.length > 1 ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {images.map((image) => {
        const url = URL.createObjectURL(image);
        const isLarge = image.size > MAX_IMAGE_SIZE;

        return (
          <div key={image.name} className="relative">
            <img
              src={url}
              alt={image.name}
              onLoad={() => URL.revokeObjectURL(url)}
              className={`w-full rounded-lg object-cover ${
                images.length > 1 ? "h-80" : "h-auto max-h-96"
              } ${isLarge ? "opacity-50" : ""}`}
            />

            {isLarge && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-lg bg-red-500 px-3 py-1 text-sm text-white">
                  File too large (max 5MB)
                </p>
              </div>
            )}

            <button
              onClick={() => removeImage(image)}
              className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black/60"
              type="button"
              disabled={disabled}
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
