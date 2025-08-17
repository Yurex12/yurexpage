'use client';

import { ChangeEvent, useEffect, useRef, useState } from 'react';

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

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log('Post submitted:', { text, images });
      setText('');
      setImages([]);
    }
  };

  //   function handleTextHeight() {
  //     if (!text.trim()) textareaRef.current!.style.height = 'auto';
  //   }

  return (
    <div className='flex flex-col gap-y-2 h-11/12 px-4 sm:px-8 mt-2'>
      <h1 className='text-2xl'>Create Post</h1>
      {/* Content: text $ images */}
      <div className='border overflow-y-auto border-slate-300 flex-1 p-1'>
        {/* Text */}
        <textarea
          value={text}
          ref={textareaRef}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className='w-full h-full outline-none font-normal resize-none bg-transparent text-gray-900 leading-relaxed placeholder:text-gray-500 border-2'
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
