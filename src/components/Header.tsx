'use client';
import { BellDotIcon, Ellipsis, Menu } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';
import Notifications from './Notifications';
import { UserAvatar } from './UserAvatar';

export function Header() {
  const [showNotification, setShowNotification] = useState(false);
  return (
    <>
      <header className='fixed top-0 z-10 flex w-full items-center justify-center bg-white shadow-sm'>
        <div className='mx-auto flex flex-1 items-center justify-between px-6 py-5 md:px-10 max-w-[1600px]'>
          <Logo />
          <div className='flex items-center gap-x-4'>
            <BellDotIcon
              size={30}
              onClick={() => setShowNotification((cur) => !cur)}
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

      {showNotification && (
        <Notifications className='fixed top-20 right-4 w-md z-20 h-[88%] s' />
      )}
    </>
  );
}
