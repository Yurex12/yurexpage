'use client';

import { MessageCircle } from 'lucide-react';

import PostCommentSection from './PostCommentSection';
import PostInteractions from './PostInteractions';

import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { useState } from 'react';

export default function EngagementActions() {
  const [text, setText] = useState('');
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [openCommentDialog, setOpenCommentDialog] = useState(false);

  const handleText = (value: string) => setText(value);
  const handleConfirmationDialog = () =>
    setOpenConfirmationDialog((open) => !open);

  function handleLeavePost() {
    setOpenConfirmationDialog(false);
    setOpenCommentDialog(false);
    setText('');
  }

  function handleCommentDialog() {
    if (openCommentDialog === true) {
      if (text.trim()) {
        setOpenConfirmationDialog(true);
      } else {
        setText('');
        setOpenCommentDialog(false);
      }
      return;
    }
    setOpenCommentDialog(true);
  }

  return (
    <div className='px-4 space-y-2'>
      {/* Actions */}
      <PostInteractions>
        <Dialog open={openCommentDialog} onOpenChange={handleCommentDialog}>
          <DialogTrigger asChild>
            <button className='w-1/2 py-2 flex items-center justify-center space-x-2 text-muted-foreground rounded-md hover:bg-gray-100'>
              <MessageCircle className='size-5' />
              <span className='text-sm'>Comment</span>
              {/* <PostDetails /> */}
            </button>
          </DialogTrigger>

          <DialogContent
            className='2xl:max-w-2xl w-full p-0 h-11/12 gap-y-0'
            showCloseButton={false}
          >
            <PostCommentSection
              openConfirmationDialog={openConfirmationDialog}
              handleText={handleText}
              text={text}
              handleLeavePost={handleLeavePost}
              handleConfirmationDialog={handleConfirmationDialog}
            />
          </DialogContent>
        </Dialog>
      </PostInteractions>
    </div>
  );
}
