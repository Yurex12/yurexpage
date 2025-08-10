'use client';
import { useEffect, useRef } from 'react';

import { MessageCircle } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import CommentBox from './CommentBox';
import CommentDialogHeader from './CommentDialogHeader';
import CommentList from './CommentList';
import ConfirmAction from './ConfirmAction';
import EngagementStats from './EngagementStats';
import PostHeader from './PostHeader';
import PostInteractions from './PostInteractions';
import TextExpander from './TextExpander';
import ImageGrid from './ImageGrid';

type PostCommentSectionProps = {
  openConfirmationDialog: boolean;
  text: string;
  handleText: (value: string) => void;
  handleLeavePost: VoidFunction;
  handleConfirmationDialog: VoidFunction;
};

export default function PostCommentSection({
  openConfirmationDialog,
  handleText,
  text,
  handleLeavePost,
  handleConfirmationDialog,
}: PostCommentSectionProps) {
  const slides: { src: string }[] = [{ src: '/d.jpg' }, { src: '/c.jpg' }];
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const commentBoxRef = useRef<HTMLTextAreaElement | null>(null);
  const handleComment = () => commentBoxRef.current?.focus();

  useEffect(() => {
    imageContainerRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <>
      <CommentDialogHeader />
      <OverlayScrollbarsComponent
        options={{
          scrollbars: {
            autoHide: 'leave',
            autoHideDelay: 300,
          },
        }}
        className='flex-1 overflow-scroll my-2'
      >
        <PostHeader />
        <TextExpander
          className='text-sm px-4 mt-2'
          text='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat eveniet vel labore vitae veniam delectus, officia eaque ut, architecto quas dolores. Incidunt nulla, suscipit eos aliquam maiores dolores pariatur odit.'
        />
        {/* image */}
        <ImageGrid images={slides} containerRef={imageContainerRef} />
        <div className='space-y-2 mt-2'>
          <EngagementStats />
          <PostInteractions className='border-y border-gray-400 py-1'>
            <button
              className='w-1/2 py-2 flex items-center justify-center space-x-2 text-muted-foreground rounded-md hover:bg-gray-100'
              onClick={handleComment}
            >
              <MessageCircle className='size-5' />
              <span className='text-sm'>Comment</span>
            </button>
          </PostInteractions>
          <CommentList />
        </div>
      </OverlayScrollbarsComponent>
      <CommentBox ref={commentBoxRef} text={text} handleText={handleText} />

      <ConfirmAction
        name='comment'
        open={openConfirmationDialog}
        handleLeavePost={handleLeavePost}
        handleConfirmationDialog={handleConfirmationDialog}
      />
    </>
  );
}
