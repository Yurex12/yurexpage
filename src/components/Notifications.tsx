'use client';

import { Ellipsis } from 'lucide-react';

import Notification from './Notification';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import NotificationOptions from './NotificationOptions';
import { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    avatar: '/c.jpg',
    name: 'Jane',
    type: 'like',
    message: 'liked your post',
    time: '5m ago',
    unread: true,
  },
  {
    id: 2,
    avatar: '/d.jpg',
    name: 'Alex',
    type: 'comment',
    message: 'commented: "Nice shot!"',
    time: '12m ago',
    unread: true,
  },
  {
    id: 32,
    avatar: '/b.jpg',
    name: 'Sara',
    type: 'follow',
    message: 'followed you',
    time: '1h ago',
    unread: false,
  },
  {
    id: 44,
    avatar: '/c.jpg',
    name: 'Josh',
    type: 'mention',
    message: 'mentioned you in a post',
    time: '2h ago',
    unread: false,
  },
  {
    id: 13,
    avatar: '/c.jpg',
    name: 'Jane',
    type: 'like',
    message: 'liked your post',
    time: '5m ago',
    unread: true,
  },
  {
    id: 28,
    avatar: '/d.jpg',
    name: 'Alex',
    type: 'comment',
    message: 'commented: "Nice shot!"',
    time: '12m ago',
    unread: true,
  },
  {
    id: 34,
    avatar: '/b.jpg',
    name: 'Sara',
    type: 'follow',
    message: 'followed you',
    time: '1h ago',
    unread: false,
  },
  {
    id: 45,
    avatar: '/c.jpg',
    name: 'Josh',
    type: 'mention',
    message: 'mentioned you in a post',
    time: '2h ago',
    unread: false,
  },
  {
    id: 11,
    avatar: '/c.jpg',
    name: 'Jane',
    type: 'like',
    message: 'liked your post',
    time: '5m ago',
    unread: true,
  },
  {
    id: 20,
    avatar: '/d.jpg',
    name: 'Alex',
    type: 'comment',
    message: 'commented: "Nice shot!"',
    time: '12m ago',
    unread: true,
  },
  {
    id: 30,
    avatar: '/b.jpg',
    name: 'Sara',
    type: 'follow',
    message: 'followed you',
    time: '1h ago',
    unread: false,
  },
  {
    id: 40,
    avatar: '/c.jpg',
    name: 'Josh',
    type: 'mention',
    message: 'mentioned you in a post',
    time: '2h ago',
    unread: false,
  },
];
type NotificationsProps = ComponentPropsWithoutRef<'div'>;

export default function Notifications({ className }: NotificationsProps) {
  return (
    <div className={cn('h-full overflow-y-scroll scrollbar-hide', className)}>
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 500,
          },
        }}
        className='bg-white h-full overflow-y-scroll p-5 rounded-xl shadow max-w-md w-full mx-auto flex flex-col '
      >
        <div className=' flex items-center justify-between'>
          <h2 className='text-xl font-bold  text-foreground'>Notifications</h2>
          <DropdownMenu>
            <DropdownMenuTrigger className='border-0 outline-0' asChild>
              <button className='bg-white hover:bg-gray-100 border-0 outline-0 p-2 rounded-full transition-colors'>
                <Ellipsis className='w-5 h-5 text-gray-600' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='border-0' side='bottom' align='end'>
              <DropdownMenuItem className='cursor-pointer'>
                Mark all as read
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <NotificationOptions />

        <ul className='space-y-3 mt-4'>
          {notifications.map((notif) => (
            <Notification notif={notif} key={notif.id} />
          ))}
        </ul>
      </OverlayScrollbarsComponent>
    </div>
  );
}
