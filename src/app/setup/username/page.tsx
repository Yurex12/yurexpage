import { Card, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";

import { redirect } from "next/navigation";
import EditUsernameForm from "./EditUsernameForm";

import { getServerSession } from "@/lib/getServerSession";

export default async function UsernameSetupPage() {
  const session = await getServerSession();

  if (!session?.user) redirect("/auth/signin");

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 md:p-10">
      <Card className="w-full max-w-sm border-gray-200 bg-white shadow">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-blue-100">
            <User className="h-7 w-7 text-blue-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Set Your Username
          </h1>
          <p className="text-gray-600">Make it uniquely yours</p>
        </CardHeader>

        <EditUsernameForm showSkipOption={true} user={session.user} />
      </Card>
    </div>
  );
}
