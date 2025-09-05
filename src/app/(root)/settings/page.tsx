import Tab from "@/components/Tab";
import AccountSettings from "./components/AccountSettings";
import PreferencesSettings from "./components/PreferenceSettings";
import SeuritySettings from "./components/SecuritySettings";

const tabs = ["account", "security", "preferences"];

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { tab: activeTab } = await searchParams;

  return (
    <div className="mx-auto max-w-4xl space-y-5 px-4 pt-4 sm:space-y-10 md:p-8">
      <Tab
        tabs={tabs}
        activeTabClassName="bg-primary text-white"
        linkClassName="hover:bg-primary flex-1 rounded-md px-2 py-1 text-center font-medium text-gray-700 shadow-none transition hover:text-white sm:text-base"
        containerClassName="flex items-center justify-between gap-x-2 rounded-md border border-gray-200 p-1 md:gap-x-4"
      />

      {/* Content */}
      <div className="rounded-md border border-gray-200 p-4">
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "security" && <SeuritySettings />}
        {activeTab === "preferences" && <PreferencesSettings />}
      </div>
    </div>
  );
}
