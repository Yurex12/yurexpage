export default function Notification({ notif }) {
  return (
    <li
      key={notif.id}
      className={`flex justify-between items-center gap-3 p-2 rounded-lg hover:bg-muted transition hover:cursor-pointer `}
    >
      <img
        src={notif.avatar}
        alt={notif.name}
        className='w-10 h-10 rounded-full object-cover'
      />
      <div className='flex-1 text-sm'>
        <p className='text-foreground'>
          <span className='font-medium'>{notif.name}</span>{' '}
          <span className='text-muted-foreground'>{notif.message}</span>
        </p>
        <span className='text-xs text-muted-foreground'>{notif.time}</span>
      </div>
      {notif.unread && <div className='size-2 bg-primary rounded-full' />}
    </li>
  );
}
