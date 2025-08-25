"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export default function NotificationOptions() {
  const [notifactionType, setNotificationType] = useState<"all" | "unread">(
    "all",
  );
  return (
    <div className="space-x-3 p-0">
      <Button
        variant={notifactionType === "all" ? "outline" : "ghost"}
        className={` ${
          notifactionType === "all" ? "text-primary" : ""
        } rounded-xl border-0`}
        onClick={() => setNotificationType("all")}
      >
        All
      </Button>
      <Button
        variant={notifactionType === "unread" ? "outline" : "ghost"}
        className={`${
          notifactionType === "unread" ? "text-primary" : ""
        } rounded-xl border-0`}
        onClick={() => setNotificationType("unread")}
      >
        Unread
      </Button>
    </div>
  );
}
