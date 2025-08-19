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
    // textareaRef.current!.style.height = '100%';
  }, []);

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log('Post submitted:', { text, images });
      setText('');
      setImages([]);
    }
  };

  function handleTextAreaHeight(value: boolean) {
    if (value) {
      textareaRef.current!.style.height = 'auto';
    } else {
      textareaRef.current!.style.height = '100%';
    }
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);

    const textarea = textareaRef.current;
    if (!textarea) return;

    if (images.length) {
      // Case: images exist → textarea shouldn’t resize, container handles scroll
      textarea.style.height = 'auto';
    } else {
      // Case: no images → textarea autosizes to fit text
      textarea.style.height = 'auto'; // reset first
      const newHeight = Math.min(
        textarea.scrollHeight,
        textarea.parentElement!.offsetHeight // container height baseline
      );
      textarea.style.height = newHeight + 'px';
    }
  }

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
          className='w-full outline-none h-full font-normal resize-none bg-transparent text-gray-900 leading-relaxed placeholder:text-gray-500'
          rows={1}
        />
        {/* Image Previews */}
        <CreatePostImagePreviews
          images={images}
          setImages={setImages}
          handleTextAreaHeight={handleTextAreaHeight}
        />
      </div>
      {/* Image Upload Section */}
      <ImageUploader
        images={images}
        setImages={setImages}
        handleTextAreaHeight={handleTextAreaHeight}
      />
      {/* Footer */}
      <CreatePostFooter
        text={text}
        imageLength={images.length}
        handleUploadPost={handleSubmit}
      />
    </div>
  );
}
