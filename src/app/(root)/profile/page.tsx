'use client';

import { useRef } from 'react';

export default function Page() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div
      className='flex-1 overflow-auto px-4 pb-28 pt-2 border-4'
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          textareaRef.current?.focus();
        }

        console.log('e.target', e.target);
        console.log('e.currentTarget', e.currentTarget);
      }}
    >
      <textarea ref={textareaRef} className='border-2' />
      <div className='images-container'>
        <img
          src='/c.ipg'
          alt='...'
          onClick={() => console.log('Image clicked!')}
        />
        {/* More images */}
      </div>
    </div>
  );
}
