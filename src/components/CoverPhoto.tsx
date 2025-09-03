import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function CoverPhoto({
  className,
  imageSrc,
  imageAlt,
}: ComponentProps<"div"> & { imageAlt: string; imageSrc: string }) {
  return (
    <div className={cn("h-30 w-full rounded-md", className)}>
      <img src={imageSrc} alt={imageAlt} className="size-full md:rounded-md" />
    </div>
  );
}
