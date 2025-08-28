"use client";

import BackButton from "@/components/BackButton";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Monitor, Smartphone } from "lucide-react";
import { useState } from "react";

const tabs = ["Account", "Security", "Preferences"];

export default function page() {
  return (
    <div className="auto ms:border mx-auto flex h-full flex-col rounded-sm sm:max-w-160 sm:border sm:border-gray-200">
      {/* Header */}
      <div className="flex w-full items-center gap-x-3 border-b border-b-gray-200 bg-white px-2 py-2">
        <BackButton />
        <span className="text-base">Settings</span>
      </div>

      {/* Body */}
      <SettingsPage />
    </div>
  );
}

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="space-y-6 p-8 sm:space-y-10">
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
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Active Sessions</h2>
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
    </div>
  );
}

function AccountSettings() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-gray-900">Account Information</h2>
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
    </div>
  );
}

function PreferencesSettings() {
  return (
    <div className="flex items-end justify-between gap-x-4">
      <div className="space-y-2">
        <p className="text-gray-800">Dark Mode</p>
        <p className="text-sm text-gray-500">
          Adjust the appearance of Yurexpage to reduce glare and give your eyes
          a break.
        </p>
      </div>

      <ModeToggle />
    </div>
  );
}
