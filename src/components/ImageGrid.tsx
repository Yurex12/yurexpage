type ImageGridProps = {
  images: string[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
};

export default function ImageGrid({ images, containerRef }: ImageGridProps) {
  const imageLength = images.length;

  return (
    <div
      className={`w-full mx-auto grid grid-cols-1 mt-2  ${
        imageLength > 1 ? 'grid-cols-2 gap-x-0.5' : ''
      }`}
      ref={containerRef}
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
