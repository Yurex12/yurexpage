'use client';

import useAutoResizeTextarea from '@/hooks/useAutoResizeTextarea';
import { SendHorizonalIcon } from 'lucide-react';
import { forwardRef, useEffect, useImperativeHandle } from 'react';

const CommentBox = forwardRef<
  HTMLTextAreaElement,
  { text: string; handleText: (value: string) => void }
>(({ text, handleText }, ref) => {
  const { textareaRef, handleInput } = useAutoResizeTextarea(300);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

  useEffect(() => {
    textareaRef.current?.focus();
  });

  return (
    <div className='w-full rounded-xl p-4 bg-white shadow-2xl shadow-gray-950'>
      <div className='flex items-start gap-3 relative'>
        <img src='./c.jpg' alt='logo' className='w-10 h-10 rounded-full' />

        <div className='flex-1 relative'>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => {
              handleText(e.target.value);
              handleInput();
            }}
            placeholder='Write a comment...'
            className='w-full bg-gray-100 rounded-lg p-3 pr-10 text-sm resize-none focus:outline-none'
          />

          {/* Send Button inside the box */}
          <button
            type='button'
            className='absolute bottom-4 right-5 text-blue-600 hover:text-blue-700 transition'
          >
            <SendHorizonalIcon className='w-5 h-5' />
          </button>
        </div>
      </div>
    </div>
  );
});

CommentBox.displayName = 'CommentBox';

export default CommentBox;
