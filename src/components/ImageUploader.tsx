import { ImageIcon, Plus } from "lucide-react";
import { RefObject } from "react";

export default function ImageUploader({
  imagesLength,
  inputRef,
}: {
  imagesLength: number;
  inputRef: RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
      <div className="flex items-center space-x-3">
        <ImageIcon className="h-5 w-5 text-gray-500" />
        <span className="text-sm text-gray-600">
          Add images ({imagesLength}/2)
        </span>
      </div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={!(imagesLength < 2)}
        className="flex items-center space-x-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-100"
      >
        <Plus className="h-4 w-4" />
        <span>Upload</span>
      </button>
    </div>
  );
}
