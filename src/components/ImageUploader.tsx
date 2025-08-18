import { Image as ImageTypes } from '@/types/types';
import { Plus, Image } from 'lucide-react';
import { Dispatch, SetStateAction, useRef } from 'react';

export default function ImageUploader({
  images,
  setImages,
  handleTextAreaHeight,
}: {
  images: ImageTypes[];
  handleTextAreaHeight?: (value: boolean) => void;
  setImages: Dispatch<SetStateAction<ImageTypes[]>>;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageUpload = (files: FileList | null) => {
    handleTextAreaHeight?.(true);
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
  return (
    <div className='flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-gray-50'>
      <div className='flex items-center space-x-3'>
        <Image className='w-5 h-5 text-gray-500' />
        <span className='text-sm text-gray-600'>
          Add images ({images.length}/2)
        </span>
      </div>
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={!(images.length < 2)}
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
  );
}
