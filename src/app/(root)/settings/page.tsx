// app/settings/page.tsx
"use client";

import { useState } from "react";

const tabs = ["Account", "Profile", "Security", "Preferences"];

export default function Page() {
  const [activeTab, setActiveTab] = useState("Account");

  return (
    <div className="mx-auto max-w-4xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Settings</h1>

      {/* Top Tabs */}
      <div className="mb-8 flex space-x-6 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-2 pb-3 font-medium transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-8">
        {activeTab === "Account" && <AccountSettings />}
        {activeTab === "Profile" && <ProfileSettings />}
        {activeTab === "Security" && <SecuritySettings />}
        {activeTab === "Preferences" && <PreferencesSettings />}
      </div>
    </div>
  );
}

function Card({
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
    <Card title="Account Settings">
      <form className="max-w-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter new username"
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter new email"
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          Save Changes
        </button>
      </form>
    </Card>
  );
}

function ProfileSettings() {
  return (
    <Card title="Profile Settings">
      <form className="max-w-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Picture
          </label>
          <input type="file" className="mt-1 w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Photo
          </label>
          <input type="file" className="mt-1 w-full rounded-xl border p-3" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            placeholder="Write something about yourself..."
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          Save Profile
        </button>
      </form>
    </Card>
  );
}

function SecuritySettings() {
  return (
    <Card title="Security Settings">
      <form className="max-w-md space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            className="mt-1 w-full rounded-xl border p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          Update Password
        </button>
      </form>
    </Card>
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
    <Card title="Preferences">
      <div className="max-w-md space-y-6">
        <Toggle id="darkMode" label="Enable Dark Mode" />
        <Toggle id="notifications" label="Enable Notifications" />
        <button className="rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700">
          Save Preferences
        </button>
      </div>
    </Card>
  );
}
