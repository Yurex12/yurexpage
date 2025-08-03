import { Logo } from './Logo';
import { UserAvatar } from './UserAvatar';

export function Header() {
  return (
    <header className='fixed top-0 z-50 mx-auto flex w-full items-center justify-between bg-white shadow-sm'>
      <div className='mx-auto flex flex-1 items-center justify-between px-4 py-5 md:px-10'>
        <Logo />
        <div className='flex items-center gap-x-4'>
          <UserAvatar />
          <span>Yurex</span>
        </div>
      </div>
    </header>
  );
}
