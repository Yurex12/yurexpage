import PostDropdownActions from './PostDropdownActions';

export default function PostHeader() {
  return (
    <div className='flex items-start justify-between px-4'>
      <div className='flex items-center space-x-3'>
        <img
          src='/c.jpg'
          alt='Profile'
          className='w-12 h-12 rounded-full object-cover'
        />
        <div className='flex flex-col'>
          <p className='text-sm font-medium text-foreground'>John Doe</p>
          <p className='text-xs text-muted-foreground'>@johndoe</p>
        </div>
      </div>
      <PostDropdownActions />
    </div>
  );
}
