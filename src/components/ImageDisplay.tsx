'use client';
import { useEffect, useRef } from 'react';

const images: string[] = ['/d.jpg', '/c.jpg'];

export default function ImageDisplay() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageLength = images.length;

  // useEffect(() => {
  //   imageRef.current?.scrollIntoView({ block: 'start' });
  // }, []);

  return (
    <div
      className={`w-full mx-auto grid grid-cols-1 mt-2  ${
        imageLength > 1 ? 'grid-cols-2 gap-x-0.5' : ''
      }`}
      ref={imageRef}
    >
      {images.map((image) => (
        <img
          src={image}
          alt=''
          className={`object-cover rounded-sm w-full ${
            image.length > 1 ? 'h-80' : 'h-auto'
          }`}
          key={image}
        />
      ))}
    </div>
  );
}
