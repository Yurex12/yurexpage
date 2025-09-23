import { Logo } from "@/components/Logo";
import SigninForm from "../components/SigninForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import SocialAuth from "../components/SocialAuth";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo />
        <Card className="border-gray-200 bg-white shadow">
          <CardHeader className="text-center">
            <CardTitle className="text-xl text-gray-700">
              Login to your account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <SigninForm />
            <SocialAuth>
              <div className="text-center text-sm text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </SocialAuth>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
