import { Logo } from "@/components/Logo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "../components/SignupForm";
import SocialAuth from "../components/SocialAuth";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Logo />
        <Card className="border-gray-200 bg-white shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-700">
              Create an account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignupForm />
            <SocialAuth>
              <div className="text-center text-sm text-gray-700">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="underline underline-offset-4"
                >
                  Sign in
                </Link>
              </div>
            </SocialAuth>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
