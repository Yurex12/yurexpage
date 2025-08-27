// app/settings/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LogOut, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

const tabs = ["Account", "Security", "Preferences"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="mx-auto max-w-4xl space-y-10 p-8">
      {/* Top Tabs */}
      <div className="flex items-center justify-between gap-x-4 rounded-md border border-gray-200 p-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`hover:bg-primary flex-1 bg-transparent font-medium text-gray-700 shadow-none transition hover:text-white ${activeTab === tab ? "bg-primary text-white" : ""}`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="rounded-md border border-gray-200 p-4">
        {activeTab === "Account" && <AccountSettings />}
        {activeTab === "Security" && <SeuritySetting />}
        {activeTab === "Preferences" && <PreferencesSettings />}
      </div>
    </div>
  );
}

export function SeuritySetting() {
  // Example data (in real case, fetch from backend)
  const sessions = [
    {
      id: 1,
      device: "Chrome on Windows",
      ip: "192.168.0.12",
      location: "Lagos, Nigeria",
      lastActive: "Just now",
      current: true,
      icon: <Monitor className="h-5 w-5 text-blue-600" />,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      ip: "192.168.0.33",
      location: "Abuja, Nigeria",
      lastActive: "2 hours ago",
      current: false,
      icon: <Smartphone className="h-5 w-5 text-green-600" />,
    },
  ];

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">Active Sessions</h2>
      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              {session.icon}
              <div>
                <p className="font-medium">{session.device}</p>
                <p className="text-sm text-gray-500">
                  {session.location} • {session.ip}
                </p>
                <p className="text-xs text-gray-400">
                  Last active: {session.lastActive}
                  {session.current && " • Current session"}
                </p>
              </div>
            </div>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

function Cardd({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function AccountSettings() {
  return (
    <form className="space-y-5">
      {/* email */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Email:{" "}
        </label>
        <Input
          type="text"
          className="h-10 w-full rounded-xl border shadow-none hover:cursor-not-allowed disabled:pointer-events-auto disabled:cursor-not-allowed"
          value="yusufekungomi@gmail.com"
          disabled
        />
      </div>
      {/* displayname */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Display name:
        </label>
        <Input
          type="text"
          placeholder="Enter new username"
          className="h-10 w-full rounded-xl border bg-gray-100 p-3 shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
        />
      </div>
      {/* username */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Username:
        </label>
        <Input
          type="text"
          placeholder="Enter new username"
          className="h-10 w-full rounded-xl border bg-gray-100 p-3 shadow-none focus:ring-0 focus:outline-none focus-visible:ring-0"
        />
      </div>
      <Button className="hover:bg-primary bg-primary px-5 font-medium text-white shadow-none transition hover:text-white">
        Save changes
      </Button>
    </form>
  );
}

// ✅ Toggle Component
function Toggle({ id, label }: { id: string; label: string }) {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function PreferencesSettings() {
  return (
    <div className="max-w-md space-y-6">
      {/* Dark Mode */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-800">Dark Mode</p>
          <p className="text-xs text-gray-500">
            Switch between light and dark theme.
          </p>
        </div>
        <Toggle id="darkMode" label="Dark mode" />
      </div>

      {/* Danger zone */}
      <div className="border-t pt-4">
        <p className="text-sm font-medium text-red-600">Danger Zone</p>
        <p className="mb-3 text-xs text-gray-500">
          Once you delete your account, all your data will be permanently
          removed.
        </p>
        <button className="w-full rounded-xl bg-red-600 px-5 py-2.5 text-white transition hover:bg-red-700">
          Delete Account
        </button>
      </div>
    </div>
  );
}
