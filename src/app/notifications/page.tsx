import BackButton from "@/components/BackButton";
import NotificationOptions from "@/components/NotificationOptions";
import NotificationsDropdown from "@/components/NotificationsDropdown";
import NotificationsList from "@/components/NotificationsList";
import { notifications } from "@/constants";

export default function page() {
  return (
    <div className="auto ms:border mx-auto flex h-full flex-col rounded-sm border border-gray-200 sm:max-w-120">
      <div className="flex items-center justify-between border border-gray-200 px-2 py-2">
        <div className="flex items-center gap-x-4">
          <BackButton />
          <h2 className="text-base font-bold">Notifications</h2>
        </div>
        <NotificationsDropdown />
      </div>
      <div className="flex-1 overflow-y-scroll px-2 pt-4">
        <NotificationOptions />
        <NotificationsList notifications={notifications} />
      </div>
    </div>
  );
}
