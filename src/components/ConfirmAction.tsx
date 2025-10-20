import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

type ConfirmActionProps = {
  open: boolean;
  name: string;
  onLeave: () => void;
  onConfirmation: () => void;
};

export default function ConfirmAction({
  name,
  open,
  onLeave,
  onConfirmation,
}: ConfirmActionProps) {
  return (
    <Dialog open={open} onOpenChange={onConfirmation}>
      {open && (
        <DialogContent
          className="mx-auto w-full rounded-2xl border-none bg-white px-0 py-4 text-gray-800 shadow-2xl outline-none sm:max-w-md"
          showCloseButton={false}
        >
          {/* Header */}
          <div className="flex items-center px-2">
            <h2 className="flex-1 text-center text-xl font-semibold">
              Leave {name}?
            </h2>

            <button
              onClick={onConfirmation}
              className="justify-end text-gray-500 transition hover:text-gray-800"
            >
              <X size={20} />
            </button>
          </div>
          <div className="border border-gray-300"></div>

          <p className="px-2 text-sm leading-relaxed text-gray-600">
            Progress on this {name} will not be saved. Would you like to keep
            editing or leave?
          </p>

          <div className="flex items-center justify-end space-x-4 px-2">
            <button
              onClick={onConfirmation}
              className="rounded-lg border px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              Stay on {name}
            </button>
            <button
              onClick={onLeave}
              className="bg-primary rounded-lg px-4 py-2 text-sm text-white transition hover:opacity-90"
            >
              Leave {name}
            </button>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}
