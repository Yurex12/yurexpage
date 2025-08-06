'use client';
import { BellDotIcon, Menu } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import Notifications from './Notifications';
import { UserAvatar } from './UserAvatar';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogOverlay,
} from './ui/dialog';

export function Header() {
  const [showNotification, setShowNotification] = useState(false);
  const handleShowNotification = () => setShowNotification((cur) => !cur);
  return (
    <>
      <header className='fixed top-0 z-10 flex w-full items-center justify-center bg-white shadow-sm'>
        <div className='mx-auto flex flex-1 items-center justify-between px-6 py-5 md:px-10 max-w-[1600px]'>
          <Logo />
          <div className='flex items-center gap-x-4'>
            <BellDotIcon
              onClick={handleShowNotification}
              size={30}
              className={`block xl:hidden ${
                showNotification ? 'text-blue-500' : ''
              }`}
            />

            <UserAvatar />
            {/* <span>Yurex</span> */}
            <Menu />
          </div>
        </div>
      </header>

      <Dialog open={showNotification} onOpenChange={handleShowNotification}>
        <DialogContent showCloseButton={false} className='w-md h-[88%]'>
          <DialogOverlay className='bg-transparent/0' />
          <Notifications />
        </DialogContent>
      </Dialog>
    </>
  );
}
