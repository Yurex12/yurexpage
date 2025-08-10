import { useState } from 'react';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';

type ImageGridProps = {
  images: { src: string }[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

export default function ImageGrid({ images, containerRef }: ImageGridProps) {
  const imageLength = images.length;

  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleOpen = (index: number) => {
    setPhotoIndex(index);
    setOpen(true);
  };
  return (
    <>
      <div
        className={`w-full mx-auto grid grid-cols-1 mt-2  ${
          imageLength > 1 ? 'grid-cols-2 gap-x-0.5' : ''
        }`}
        ref={containerRef}
      >
        {images.map((image, i) => (
          <img
            src={image.src}
            alt=''
            className={`object-cover rounded-sm w-full ${
              images.length > 1 ? 'h-80' : 'h-auto'
            }`}
            key={image.src}
            onClick={() => handleOpen(i)}
          />
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={photoIndex}
        controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      />
    </>
  );
}
