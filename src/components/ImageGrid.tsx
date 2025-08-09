type ImageGridProps = {
  images: { src: string }[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
  handleOpenPhoto?: (index: number) => void;
};

export default function ImageGrid({
  images,
  containerRef,
  handleOpenPhoto,
}: ImageGridProps) {
  const imageLength = images.length;

  return (
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
          onClick={() => handleOpenPhoto?.(i)}
        />
      ))}
    </div>
  );
}
