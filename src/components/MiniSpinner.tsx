import { Loader2 } from "lucide-react";

export default function MiniSpinner({ text }: { text?: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <Loader2 className="h-4 w-4 animate-spin" />
      {text}
    </div>
  );
}
