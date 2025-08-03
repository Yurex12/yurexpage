'use client';

import { ThumbsUp } from 'lucide-react';
import { ReactNode, useState } from 'react';

function PostInteractions({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [liked, setLiked] = useState(false);
  return (
    <div className={`flex items-center ${className}`}>
      <button
        onClick={() => setLiked(!liked)}
        className={`w-1/2 py-2 flex items-center justify-center hover:bg-gray-100 text-muted-foreground rounded-md space-x-2`}
      >
        <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-blue-500' : ''}`} />
        <span className='text-sm'>Like</span>
      </button>

      {children}
    </div>
  );
}

export default PostInteractions;
