"use client";

import { User } from "lucide-react";
import EditUsernameForm from "./EditUsernameForm";

const UsernameSetupScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200/50 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="mb-4 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            <User className="h-7 w-7 text-blue-600" />
          </div>
          <h1 className="mb-3 text-2xl font-semibold text-gray-900">
            Set Your Username
          </h1>
          <p className="text-gray-600">Make it uniquely yours</p>
        </div>

        <EditUsernameForm showSkipOption={true} />
      </div>
    </div>
  );
};

export default UsernameSetupScreen;
