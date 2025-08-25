"use client";
import { BellDotIcon } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import MobileNavbar from "./MobileNavbar";
import Notifications from "./Notifications";
import { UserAvatar } from "./UserAvatar";
import { Dialog, DialogContent } from "./ui/dialog";
import { useRouter } from "next/navigation";
import { MOBILE_DEVICE_BREAKPOINT } from "@/constants";

export function Header() {
  const [showNotification, setShowNotification] = useState(false);

  const router = useRouter();
  function handleShowNotification() {
    if (window.innerWidth > MOBILE_DEVICE_BREAKPOINT)
      setShowNotification((show) => !show);
    else router.push("/notifications");
  }

  return (
    <>
      <header className="fixed top-0 z-10 flex w-full items-center justify-center bg-white shadow-sm">
        <div className="mx-auto flex max-w-[1600px] flex-1 items-center justify-between px-6 py-5 md:px-10">
          <Logo />
          <div className="flex items-center gap-x-4">
            <BellDotIcon
              onClick={handleShowNotification}
              size={30}
              className={`block xl:hidden ${
                showNotification ? "text-blue-500" : ""
              }`}
            />
            <UserAvatar />
            <MobileNavbar />
          </div>
        </div>
      </header>

      <Dialog open={showNotification} onOpenChange={handleShowNotification}>
        <DialogContent
          showCloseButton={false}
          showOverlay={false}
          className="top-[9%] right-[4%] left-auto h-[90%] w-md translate-x-[-0] translate-y-[-0] border-0 p-0 shadow-2xl"
        >
          <Notifications />
        </DialogContent>
      </Dialog>
    </>
  );
}
