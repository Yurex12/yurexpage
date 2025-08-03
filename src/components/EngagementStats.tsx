import { ThumbsUp } from 'lucide-react';

function EngagementStats() {
  return (
    <div className='flex justify-between items-center text-sm text-muted-foreground px-4'>
      <div className='flex items-center space-x-1'>
        <ThumbsUp className='size-5 text-blue-500' fill='currentColor' />
        <span>13 likes</span>
      </div>
      <span className='hover:underline cursor-pointer'>15 comments</span>
    </div>
  );
}

export default EngagementStats;
