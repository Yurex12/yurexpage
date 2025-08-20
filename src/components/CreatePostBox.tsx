'use client';

import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { Image as ImageType } from '@/types/types';
import CreatePostFooter from './CreatePostFooter';
import ImageUploader from './ImageUploader';
import CreatePostImagePreviews from './CreatePostImagePreviews';

export default function CreatePostBox() {
  const [text, setText] = useState('');
  const [images, setImages] = useState<ImageType[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log('Post submitted:', { text, images });
      setText('');
      setImages([]);
    }
    textareaRef.current!.style.height = 'auto';
  };

  const handleAutoResizeTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  };

  function handleFocus(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    if (e.target === e.currentTarget) textareaRef.current?.focus();
  }

  return (
    <div className='flex flex-col gap-y-2 h-11/12 px-4 sm:px-8 mt-2'>
      <h1 className='text-2xl'>Create Post</h1>
      {/* Content: text $ images */}
      <div
        className='border overflow-auto border-slate-300 flex-1 p-2 rounded-md cursor-text'
        onClick={handleFocus}
      >
        {/* Text */}
        <textarea
          value={text}
          ref={textareaRef}
          onChange={handleAutoResizeTextarea}
          placeholder="What's on your mind?"
          className='w-full outline-none font-normal resize-none bg-transparent text-gray-900 leading-relaxed placeholder:text-gray-500'
          rows={1}
        />
        {/* Image Previews */}
        <CreatePostImagePreviews images={images} setImages={setImages} />
      </div>
      {/* Image Upload Section */}
      <ImageUploader images={images} setImages={setImages} />
      {/* Footer */}
      <CreatePostFooter
        text={text}
        imageLength={images.length}
        handleUploadPost={handleSubmit}
      />
    </div>
  );
}
