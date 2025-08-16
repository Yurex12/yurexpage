import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from '@/components/ui/carousel';
import { X } from 'lucide-react';

interface ImageSliderProps {
  images: { src: string; alt?: string }[];
  containerClassName?: string;
  imageClassName?: string;
}

export default function ImageSlider({
  images,
  containerClassName = '',
  imageClassName = '',
}: ImageSliderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  // Handle carousel API
  useEffect(() => {
    if (!api) return;

    // Listen for slide changes
    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !api) return;

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        api.scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        api.scrollNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, api]);

  const openSlider = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleImageLoad = () => {
    // Optional: Add loading state management here
  };

  return (
    <>
      {/* Image Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-2 ${containerClassName}`}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className='relative cursor-pointer group overflow-hidden rounded-lg'
            onClick={() => openSlider(index)}
          >
            <img
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className={`w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 ${imageClassName}`}
            />
            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
              <div className='text-white text-sm font-medium px-3 py-1 bg-black/50 rounded'>
                View Image
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Slider Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='sm:max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0'>
          <div className='relative w-full h-full'>
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className='absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors'
            >
              <X size={24} />
            </button>

            {/* Image Counter */}
            <div className='absolute top-4 left-4 z-50 px-3 py-1 rounded-full bg-black/50 text-white text-sm'>
              {currentIndex + 1} / {images.length}
            </div>

            {/* Carousel Container */}
            <div className='w-full h-full flex items-center justify-center p-4'>
              <Carousel
                setApi={setApi}
                className='w-full h-full max-w-full'
                opts={{
                  align: 'center',
                  loop: true,
                  skipSnaps: false,
                  dragFree: false,
                  startIndex: currentIndex, // Start at the selected image
                }}
              >
                <CarouselContent className='h-full'>
                  {images.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className='h-full flex items-center justify-center'
                    >
                      <div className='w-full h-full flex items-center justify-center'>
                        <img
                          src={image.src}
                          alt={image.alt || `Image ${index + 1}`}
                          className='w-full h-auto object-contain select-none'
                          onLoad={handleImageLoad}
                          draggable={false}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                {/* Custom styled navigation buttons */}
                {images.length > 1 && (
                  <>
                    <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-0 text-white h-12 w-12' />
                    <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 border-0 text-white h-12 w-12' />
                  </>
                )}
              </Carousel>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && images.length <= 10 && (
              <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 rounded-full px-4 py-2'>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      api?.scrollTo(index);
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
