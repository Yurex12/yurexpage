'use client';

import { Image, Plus, Send, X } from 'lucide-react';
import { ChangeEvent, useEffect, useRef } from 'react';

import { DialogClose } from './ui/dialog';
import { CreatePostDialogProps } from '@/types/types';

export default function CreatePostDialog({
  text,
  images,
  setText,
  setImages,
}: CreatePostDialogProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const newImages = Array.from(files).slice(0, 2 - images.length);
    newImages.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          setImages((prev) => [
            ...prev,
            {
              id: Date.now() + Math.random(),
              file,
              url: e.target?.result ?? '',
              name: file.name,
            },
          ]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = () => {
    if (text.trim() || images.length > 0) {
      console.log('Post submitted:', { text, images });
      setText('');
      setImages([]);
    }
  };

  const canAddMoreImages = images.length < 2;

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
        {/* Text */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="What's on your mind?"
          className='w-full border-none outline-none text-base font-normal resize-none bg-transparent text-gray-900 leading-relaxed placeholder:text-gray-500'
          rows={1}
        />
        {/* Image Previews */}
        {images.length > 0 && (
          <div
            className={`w-full mx-auto grid grid-cols-1 mt-2  ${
              images.length > 1 ? 'grid-cols-2 gap-x-0.5' : ''
            } `}
          >
            {images.map((image) => (
              <div key={image.id} className='relative'>
                <img
                  src={image.url}
                  alt={image.name}
                  className={`object-cover rounded-sm w-full ${
                    images.length > 1 ? 'h-80' : 'h-auto'
                  }`}
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className='absolute top-1 right-1 p-1 bg-white/80 rounded-full'
                >
                  <X className='size-4' />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload Section */}
      <div className='flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50'>
        <div className='flex items-center space-x-3'>
          <Image className='w-5 h-5 text-gray-500' />
          <span className='text-sm text-gray-600'>
            Add images ({images.length}/2)
          </span>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={!canAddMoreImages}
          className='flex items-center space-x-1 px-3 py-1.5 bg-blue-100 hover:bg-blue-400 text-blue-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-100'
        >
          <Plus className='w-4 h-4' />
          <span>Upload</span>
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type='file'
          multiple
          accept='image/*'
          onChange={(e) => handleImageUpload(e.target.files)}
          className='hidden'
        />
      </div>

      {/* Footer */}
      <div className='flex items-center justify-end border-t border-gray-100 bg-gray-50 rounded-b-2xl pt-4'>
        <div className='flex items-center space-x-3'>
          <button
            onClick={handleSubmit}
            disabled={!text.trim() && images.length === 0}
            className='flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100'
          >
            <Send className='w-4 h-4' />
            <span>Post</span>
          </button>
        </div>
      </div>
    </>
  );
}
