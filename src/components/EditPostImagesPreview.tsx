/* eslint-disable @next/next/no-img-element */
import { X } from "lucide-react";

import { ImageUploadResponse } from "@/types/types";

export default function EditPostImagesPreviews({
  images,
  removeImage,
}: {
  images: ImageUploadResponse[];
  disabled?: boolean;
  removeImage: (fileId: string) => void;
}) {
  if (images.length === 0) return null;

  return (
    <div
      className={`mx-auto mt-1 grid w-full gap-1 ${
        images.length > 1 ? "grid-cols-2" : "grid-cols-1"
      }`}
    >
      {images.map((image) => {
        return (
          <div key={image.name} className="relative">
            <img
              src={image.url}
              alt={image.name}
              className={`w-full rounded-lg object-cover ${
                images.length > 1 ? "h-80" : "h-auto max-h-96"
              }`}
            />

            <button
              onClick={() => removeImage(image.fileId)}
              className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-black/60"
              type="button"
              //   disabled={disabled}
            >
              <X className="size-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
