import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useClientSession() {
  const { data, isPending, error } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !error && !data?.user) router.push("/auth/signin");
  }, [router, isPending, data, error]);

  if (error) {
    throw new Error(
      `Authentication error: ${error.message || "Unknown error"}`,
    );
  }

  return {
    user: data?.user,
    isPending,
    isAuthenticated: !!data?.user,
  };
}
