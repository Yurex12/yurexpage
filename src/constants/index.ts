import { Link, Tab } from "@/types/types";
import { Home, Settings, User } from "lucide-react";

export const MOBILE_DEVICE_BREAKPOINT = 480;
export const MOBILE_BREAKPOINT = 600;
export const DESKTOP_BREAKPOINT = 850;

export const links: Link[] = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    href: "/settings",

    icon: Settings,
  },
];

export const tabs: Tab = ["posts", "images"];

export const hideHeaderRoutes: string[] = ["/settings", "/profile"];

export const notifications = [
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

export const MIN_USERNAME_LENGTH = 4;
export const MAX_USERNAME_LENGTH = 15;
export const USERNAME_AVAILABILITY_DEBOUNCE = 500; // ms
