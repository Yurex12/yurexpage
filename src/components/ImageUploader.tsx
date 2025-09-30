import { Image as ImageTypes } from "@/types/types";
import { Image, Plus } from "lucide-react";
import { Dispatch, SetStateAction, useRef } from "react";

export default function ImageUploader({
  images,
  setImages,
}: {
  images: ImageTypes[];
  setImages: Dispatch<SetStateAction<ImageTypes[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files).slice(0, 2 - images.length);
    newImages.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              url: e.target?.result ?? "",
              name: file.name,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center space-x-3">
        <Image className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-600">
          Add images ({images.length}/2)
        </span>
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={!(images.length < 2)}
        className="flex items-center space-x-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-100"
      >
        <Plus className="h-4 w-4" />
        <span>Upload</span>
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files)}
        // className="hidden"
      />
    </div>
  );
}
