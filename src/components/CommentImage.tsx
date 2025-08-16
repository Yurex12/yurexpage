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
        className={`w-full mx-auto grid grid-cols-1 mt-2  ${
          images.length > 1 ? 'grid-cols-2 gap-x-0.5' : ''
        }`}
        ref={ref}
      >
        {images.map((image, index) => (
          <img
            src={image.src}
            alt=''
            className={`object-cover rounded-sm w-full ${
              images.length > 1 ? 'h-80' : 'h-auto'
            }`}
            key={image.src}
            onClick={() => handleOpenImage(index)}
          />
        ))}
      </div>
      <DialogContent className='sm:max-w-11/12 h-11/12 p-0 border-0 bg-transparent shadow-2xl'>
        <div className='relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700/50 backdrop-blur-sm'>
          {/* Header with subtle gradient */}
          <div className='absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none' />

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
                  <div className='relative flex items-center justify-center w-full h-[32rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden'>
                    {/* Subtle grid pattern overlay */}
                    <div
                      className='absolute inset-0 opacity-5'
                      style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    <img
                      src={image.src}
                      alt={`Image ${index + 1}`}
                      className='h-full w-auto object-contain drop-shadow-2xl'
                    />

                    {/* Subtle vignette effect */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 pointer-events-none' />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Custom styled navigation buttons */}
            <CarouselPrevious className='left-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-200 shadow-lg' />
            <CarouselNext className='right-4 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-200 shadow-lg' />
          </Carousel>

          {/* Bottom gradient overlay */}
          <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none' />
        </div>
      </DialogContent>
    </Dialog>
  );
}
