'use client';
import { ChangeEvent, useEffect, useRef } from 'react';

import { DialogClose } from './ui/dialog';
import { CreatePostDialogProps } from '@/types/types';
import CreatePostFooter from './CreatePostFooter';
import CreatePostImagePreviews from './CreatePostImagePreviews';
import ImageUploader from './ImageUploader';
import { X } from 'lucide-react';

export default function CreatePostDialog({
  text,
  images,
  setText,
  setImages,
}: CreatePostDialogProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
  };

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log('Post submitted:', { text, images });
      setText('');
      setImages([]);
    }
  };

  return (
    <>
      {/* Header */}
      <div className='flex items-center justify-between border-b border-gray-100'>
        <h2 className='text-xl font-semibold text-gray-900'>Create Post</h2>
        <DialogClose asChild>
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <X className='w-5 h-5 text-gray-500' />
          </button>
        </DialogClose>
      </div>

      {/* Content: text $ images */}
      <div className='overflow-y-auto'>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className='w-full border-none outline-none font-normal resize-none bg-transparent leading-relaxed placeholder:text-gray-500'
          rows={1}
        />
        <CreatePostImagePreviews images={images} setImages={setImages} />
      </div>

      <ImageUploader images={images} setImages={setImages} />

      <CreatePostFooter
        text={text}
        imageLength={images.length}
        handleUploadPost={handleSubmit}
      />
    </>
  );
}
