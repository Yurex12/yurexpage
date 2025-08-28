import { Link } from "@/types/types";
import { Home, Settings, User } from "lucide-react";

export const MOBILE_DEVICE_BREAKPOINT = 480;
export const MOBILE_BREAKPOINT = 600;
export const DESKTOP_BREAKPOINT = 850;

export const links: Link[] = [
  { name: "Home", href: "/", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  {
    name: "Settings",
    href:
      window.innerWidth > MOBILE_DEVICE_BREAKPOINT
        ? "/settings"
        : "/settings-mobile",
    icon: Settings,
  },
];
