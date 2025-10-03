"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";

export default function CommentImage({
  images,
}: {
  images: { src: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(1);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: "start" });
  }, []);

  const handleOpen = () => setOpen((open) => !open);

  function handleOpenImage(index: number) {
    setStartIndex(index);
    setOpen(true);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <div
        className={`mx-auto mt-2 grid w-full grid-cols-1 ${
          images.length > 1 ? "grid-cols-2 gap-x-0.5" : ""
        }`}
        ref={ref}
      >
        {images.map((image, index) => (
          <img
            src={image.src}
            alt=""
            className={`w-full cursor-pointer rounded-md object-cover ${
              images.length > 1 ? "h-80" : "h-auto"
            }`}
            key={image.src}
            onClick={() => handleOpenImage(index)}
          />
        ))}
      </div>
      <DialogContent className="border-0 bg-black/90 p-0 shadow-2xl backdrop-blur-xl sm:max-w-4xl">
        <div className="relative overflow-hidden rounded-xl border border-white/10">
          {/* Top overlay */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 z-10 h-20 bg-gradient-to-b from-black/70 to-transparent" />

          <Carousel
            className="w-full"
            opts={{
              align: "center",
              startIndex,
            }}
          >
            <CarouselContent>
              {images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative flex h-[34rem] w-full items-center justify-center bg-black">
                    {/* Vignette background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80" />

                    <img
                      src={image.src}
                      alt={`Image ${index + 1}`}
                      className="relative z-10 h-full w-auto object-contain drop-shadow-2xl transition-all duration-300"
                    />

                    {/* Vignette edges */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/40" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons - modern glassy */}
            <CarouselPrevious className="left-4 h-10 w-10 rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/60" />
            <CarouselNext className="right-4 h-10 w-10 rounded-full border border-white/20 bg-black/40 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-black/60" />
          </Carousel>

          {/* Bottom overlay */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
