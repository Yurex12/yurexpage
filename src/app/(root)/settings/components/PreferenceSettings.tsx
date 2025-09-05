import { ModeToggle } from "@/components/ModeToggle";

export default function PreferencesSettings() {
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
