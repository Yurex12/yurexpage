'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';

export default function CommentImage({
  images,
}: {
  images: { src: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const ref = useRef<HTMLDivElement | null>(null);
  const handleOpen = () => setOpen((open) => !open);

  function handleOpenImage(index: number) {
    setStartIndex(index);
    setOpen(true);
  }

  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <div
        className={`w-full mx-auto grid grid-cols-1 mt-2 ${
          images.length > 1 ? 'grid-cols-2 gap-x-0.5' : ''
        }`}
        ref={ref}
      >
        {images.map((image, index) => (
          <img
            src={image.src}
            alt=''
            className={`object-cover rounded-md w-full cursor-pointer ${
              images.length > 1 ? 'h-80' : 'h-auto'
            }`}
            key={image.src}
            onClick={() => handleOpenImage(index)}
          />
        ))}
      </div>
      <DialogContent className='sm:max-w-4xl p-0 border-0 bg-black/90 backdrop-blur-xl shadow-2xl'>
        <div className='relative rounded-xl overflow-hidden border border-white/10'>
          {/* Top overlay */}
          <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none' />

          <Carousel
            className='w-full'
            opts={{
              align: 'center',
              startIndex,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className='relative flex items-center justify-center w-full h-[34rem] bg-black'>
                    {/* Vignette background */}
                    <div className='absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80' />

                    <img
                      src={image.src}
                      alt={`Image ${index + 1}`}
                      className='h-full w-auto object-contain relative z-10 drop-shadow-2xl transition-all duration-300'
                    />

                    {/* Vignette edges */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40 pointer-events-none' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons - modern glassy */}
            <CarouselPrevious className='left-4 bg-black/40 border border-white/20 text-white hover:bg-black/60 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-lg rounded-full w-10 h-10' />
            <CarouselNext className='right-4 bg-black/40 border border-white/20 text-white hover:bg-black/60 hover:border-white/30 backdrop-blur-md transition-all duration-300 shadow-lg rounded-full w-10 h-10' />
          </Carousel>

          {/* Bottom overlay */}
          <div className='absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/70 to-transparent pointer-events-none' />
        </div>
      </DialogContent>
    </Dialog>
  );
}
