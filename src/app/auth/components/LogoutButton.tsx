"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    startTransition(async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/signin");
          },
          onError: () => {
            toast.error("Something went wrong");
          },
        },
      });
    });
  }

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      Logout
    </Button>
  );
}
