'use client';

import { MessageCircle } from 'lucide-react';
import { useRef, useState } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import EngagementStats from './EngagementStats';
import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostInteractions from './PostInteractions';
import TextExpander from './TextExpander';

const slides: { src: string }[] = [{ src: '/yusuf.jpg' }, { src: '/c.jpg' }];

const mobileCommentBoxHeight = 200;

export default function MobilePostDetials() {
  const [text, setText] = useState('');
  const textArearef = useRef<HTMLTextAreaElement>(null);

  const handleText = (value: string) => setText(value);

  const handleAutoFocus = () => textArearef.current?.focus();
  return (
    <div className='flex flex-col h-full'>
      {/* Header */}
      {/* <div className='flex items-center bg-white w-full px-2 py-1'>
        <button className='bg-white hover:bg-gray-100 border-0 outline-0 p-1 rounded-full transition-colors'>
          <MoveLeft className='size-6 text-gray-900' />
        </button>
      </div> */}

      <div className='flex-1 overflow-y-auto py-2'>
        <PostHeader />
        <TextExpander
          className='px-4 mt-2'
          text='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.'
        />
        {/* image */}
        <PostImage images={slides} />

        <div className='space-y-2 mt-2'>
          <EngagementStats />
          <PostInteractions className='border-y border-gray-400 py-1'>
            <button
              className='w-1/2 py-2 flex items-center justify-center space-x-2 text-muted-foreground rounded-md hover:bg-gray-100'
              onClick={handleAutoFocus}
            >
              <MessageCircle className='size-5' />
              <span className='text-sm'>Comment</span>
            </button>
          </PostInteractions>
          <CommentList />
        </div>
      </div>
      <CommentBox
        text={text}
        handleText={handleText}
        maxTextAreaHeight={mobileCommentBoxHeight}
        ref={textArearef}
      />
    </div>
  );
}
