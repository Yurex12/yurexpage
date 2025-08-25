import Notification from "./Notification";

export default function NotificationsList({ notifications }) {
  return (
    <ul className="mt-4 space-y-3">
      {notifications.map((notif) => (
        <Notification notif={notif} key={notif.id} />
      ))}
    </ul>
  );
}
