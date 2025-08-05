'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { links } from '@/constants';

export function SideBar() {
  const pathname = usePathname();

  return (
    <aside className='px-10 py-6 hidden lg:block'>
      <ul className='flex flex-col space-y-5'>
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-4 py-2 rounded-md hover:bg-gray-50 group ${
              link.href === pathname ? 'bg-gray-50' : ''
            }`}
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
    </aside>
  );
}
