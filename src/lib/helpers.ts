import { ChangeEvent, Ref, RefObject } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (el: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === "function") {
        ref(el);
      } else {
        (ref as RefObject<T | null>).current = el;
      }
    });
  };
}

export function handleImageUpload(
  e: ChangeEvent<HTMLInputElement>,
  field: ControllerRenderProps<
    {
      content: string;
      images: File[];
    },
    "images"
  >,
  form: UseFormReturn<{
    content: string;
    images: File[];
  }>,
) {
  const files = e.target.files;
  const prevImages = form.getValues("images");

  if (!files) {
    field.onChange([]);
    return;
  }

  const existingSignatures = new Set(
    prevImages.map(
      (file: File) => `${file.name}-${file.size}-${file.lastModified}`,
    ),
  );

  const uniqueNewFiles = Array.from(files).filter(
    (file) =>
      !existingSignatures.has(`${file.name}-${file.size}-${file.lastModified}`),
  );

  field.onChange([...prevImages, ...uniqueNewFiles].slice(0, 2));

  e.target.value = "";
}

export function removeImage(
  file: File,
  images: File[],
  form: UseFormReturn<{
    content: string;
    images: File[];
  }>,
) {
  const signature = `${file.name}-${file.size}-${file.lastModified}`;
  const newImages = images.filter(
    (img) => `${img.name}-${img.size}-${img.lastModified}` !== signature,
  );
  form.setValue("images", newImages);
  form.trigger("images");
}
