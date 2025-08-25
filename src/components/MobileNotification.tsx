import React from "react";
import BackButton from "./BackButton";
import NotificationsDropdown from "./NotificationsDropdown";
import NotificationOptions from "./NotificationOptions";
import NotificationsList from "./NotificationsList";

const notifications = [
  {
    id: 1,
    avatar: "/c.jpg",
    name: "Jane",
    type: "like",
    message: "liked your post",
    time: "5m ago",
    unread: true,
  },
  {
    id: 2,
    avatar: "/d.jpg",
    name: "Alex",
    type: "comment",
    message: 'commented: "Nice shot!"',
    time: "12m ago",
    unread: true,
  },
  {
    id: 32,
    avatar: "/b.jpg",
    name: "Sara",
    type: "follow",
    message: "followed you",
    time: "1h ago",
    unread: false,
  },
  {
    id: 44,
    avatar: "/c.jpg",
    name: "Josh",
    type: "mention",
    message: "mentioned you in a post",
    time: "2h ago",
    unread: false,
  },
  {
    id: 13,
    avatar: "/c.jpg",
    name: "Jane",
    type: "like",
    message: "liked your post",
    time: "5m ago",
    unread: true,
  },
  {
    id: 28,
    avatar: "/d.jpg",
    name: "Alex",
    type: "comment",
    message: 'commented: "Nice shot!"',
    time: "12m ago",
    unread: true,
  },
  {
    id: 34,
    avatar: "/b.jpg",
    name: "Sara",
    type: "follow",
    message: "followed you",
    time: "1h ago",
    unread: false,
  },
  {
    id: 45,
    avatar: "/c.jpg",
    name: "Josh",
    type: "mention",
    message: "mentioned you in a post",
    time: "2h ago",
    unread: false,
  },
  {
    id: 11,
    avatar: "/c.jpg",
    name: "Jane",
    type: "like",
    message: "liked your post",
    time: "5m ago",
    unread: true,
  },
  {
    id: 20,
    avatar: "/d.jpg",
    name: "Alex",
    type: "comment",
    message: 'commented: "Nice shot!"',
    time: "12m ago",
    unread: true,
  },
  {
    id: 30,
    avatar: "/b.jpg",
    name: "Sara",
    type: "follow",
    message: "followed you",
    time: "1h ago",
    unread: false,
  },
  {
    id: 40,
    avatar: "/c.jpg",
    name: "Josh",
    type: "mention",
    message: "mentioned you in a post",
    time: "2h ago",
    unread: false,
  },
];

export default function MobileNotification() {
  return (
    <div className="auto ms:border mx-auto flex h-full flex-col rounded-sm border border-gray-200 sm:max-w-120">
      <div className="flex items-center justify-between border border-gray-200 px-2 py-2">
        <div className="flex items-center gap-x-4">
          <BackButton />
          <h2 className="text-base">Notifications</h2>
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
