'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from './ui/button';

import { links } from '@/constants';
import { useState } from 'react';

export default function MobileNavbar() {
  const [openSheet, setOpenSheet] = useState(false);
  const pathname = usePathname();

  const handleOpenSheet = () => setOpenSheet((open) => !open);
  return (
    <Sheet open={openSheet} onOpenChange={handleOpenSheet}>
      <SheetTrigger>
        <Menu className='lg:hidden cursor-pointer' size={30} />
      </SheetTrigger>
      <SheetContent
        showCloseButton={false}
        className='space-y-2 p-0 gap-0 pt-2 px-2'
      >
        {/* close button */}
        <div className='flex justify-end'>
          <SheetClose asChild>
            <Button variant='ghost'>
              <X className='size-6' />
            </Button>
          </SheetClose>
        </div>

        <ul className='flex flex-col space-y-4'>
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-md hover:bg-gray-50 group ${
                link.href === pathname ? 'bg-gray-50' : ''
              }`}
              onClick={handleOpenSheet}
            >
              <div className='flex gap-x-4'>
                <link.icon
                  className={`group-hover:text-primary ${
                    link.href === pathname ? 'text-primary' : ''
                  }`}
                />
                <span
                  className={`group-hover:text-gray-800 ${
                    link.href === pathname ? 'text-gray-800' : ''
                  }`}
                >
                  {link.name}
                </span>
              </div>
            </Link>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
