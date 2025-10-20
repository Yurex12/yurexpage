import { X } from "lucide-react";

export default function PostFormHeader({
  disabled,
  onClose,
  text,
}: {
  disabled: boolean;
  text: string;
  onClose: VoidFunction;
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900">{text}</h2>

      <button
        className="rounded-full p-2 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
        disabled={disabled}
        onClick={onClose}
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}
