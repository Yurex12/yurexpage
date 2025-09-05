type TCoverPhoto = {
  imageAlt: string;
  imageSrc: string;
};

export default function CoverPhoto({ imageSrc, imageAlt }: TCoverPhoto) {
  return (
    <div className="h-30 w-full rounded-md md:h-60">
      <img src={imageSrc} alt={imageAlt} className="size-full md:rounded-md" />
    </div>
  );
}
