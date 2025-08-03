import { useState } from 'react';
import { Button } from './ui/button';

export default function NotificationOptions() {
  const [notifactionType, setNotificationType] = useState<'all' | 'unread'>(
    'all'
  );
  return (
    <div className='space-x-3 mt-2'>
      <Button
        variant={notifactionType === 'all' ? 'outline' : 'ghost'}
        className={` ${
          notifactionType === 'all' ? 'text-primary' : ''
        } border-0 rounded-xl`}
        onClick={() => setNotificationType('all')}
      >
        All
      </Button>
      <Button
        variant={notifactionType === 'unread' ? 'outline' : 'ghost'}
        className={`${
          notifactionType === 'unread' ? 'text-primary' : ''
        } border-0 rounded-xl`}
        onClick={() => setNotificationType('unread')}
      >
        Unread
      </Button>
    </div>
  );
}
