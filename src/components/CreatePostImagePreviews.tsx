import { Image } from '@/types/types';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export default function CreatePostImagePreviews({
  images,
  setImages,
}: {
  images: Image[];
  setImages: Dispatch<SetStateAction<Image[]>>;
}) {
  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };
  return (
    <>
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
    </>
  );
}
