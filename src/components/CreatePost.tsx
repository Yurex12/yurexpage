'use client';
import { useState } from 'react';

import { ImageIcon } from 'lucide-react';

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from './ui/dialog';
import ConfirmAction from './ConfirmAction';
import CreatePostDialog from './CreatePostDialog';

import { Image } from '@/types/types';

export default function CreatePost() {
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const [text, setText] = useState('');
  const [images, setImages] = useState<Image[]>([]);

  const handleConfirmationDialog = () =>
    setOpenConfirmationDialog((open) => !open);

  // const handleCloseConfirmationDialog = () => setOpenConfirmationDialog(false);

  function handlePostDialog() {
    if (openPostDialog === true) {
      if (text.trim() || images.length) {
        setOpenConfirmationDialog(true);
      } else {
        setText('');
        setOpenPostDialog(false);
      }
      return;
    }
    setOpenPostDialog(true);
  }

  function handleLeavePost() {
    setOpenConfirmationDialog(false);
    setOpenPostDialog(false);
    setText('');
    setImages([]);
  }

  function handleImageUpload() {
    setOpenPostDialog(true);
  }

  return (
    <>
      <div className='flex items-center mx-auto w-140 gap-3 px-4 py-3 bg-white rounded-xl shadow-sm'>
        {/* Profile Picture */}
        <img
          src='/b.jpg'
          alt='User'
          className='size-10 rounded-full object-cover'
        />

        {/* Input Area */}
        <div className='flex-1 flex items-center gap-x-2'>
          <Dialog open={openPostDialog} onOpenChange={handlePostDialog}>
            <DialogTrigger asChild>
              <button className='w-full resize-none bg-gray-100 px-4 py-3 text-start rounded-full text-sm text-gray-800 placeholder-gray-500 outline-none pr-8 hover:cursor-pointer'>
                What&apos;s on your mind, Adeyemi?
              </button>
            </DialogTrigger>
            <DialogContent
              className='flex flex-col p-4 max-h-10/12 border-0 outline-0'
              showCloseButton={false}
            >
              <DialogTitle className='sr-only'>Post Modal</DialogTitle>
              <CreatePostDialog
                text={text}
                setText={setText}
                images={images}
                setImages={setImages}
              />
            </DialogContent>
          </Dialog>
          {/* Image Upload Icon */}
          <button
            className='text-gray-500 hover:text-blue-600 transition cursor-pointer'
            onClick={handleImageUpload}
          >
            <label htmlFor='upload-image' className='cursor-pointer'>
              <ImageIcon className='h-full' />
            </label>
            <input
              id='upload-image'
              type='file'
              className='hidden'
              accept='multiple'
            />
          </button>
        </div>
      </div>

      <ConfirmAction
        open={openConfirmationDialog}
        name='post'
        handleLeavePost={handleLeavePost}
        handleConfirmationDialog={handleConfirmationDialog}
      />
    </>
  );
}
