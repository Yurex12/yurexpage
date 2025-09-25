import { Button } from "@/components/ui/button";
import { router } from "better-auth/api";
import { useRouter } from "next/navigation";

export default function SkipButton({ disabled }: { disabled: boolean }) {
  const router = useRouter();

  const handleSkip = () => router.push("/");
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleSkip}
      disabled={disabled}
      className="w-full text-gray-500 hover:text-gray-700"
    >
      Skip for now
    </Button>
  );
}
