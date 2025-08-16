import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Dialog, DialogContent } from './ui/dialog';

export default function ImageSliders() {
  return (
    <Dialog defaultOpen>
      <DialogContent
        showCloseButton={false}
        className='sm:max-w-full sm:w-10/12 h-11/12'
      >
        <Carousel className='w-full max-w-sm mx-auto'>
          <CarouselContent className='-ml-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className='pl-1'>
                <div className='p-1'>
                  <Card>
                    <CardContent className='flex aspect-square items-center justify-center p-6'>
                      <span className='text-2xl font-semibold'>
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
