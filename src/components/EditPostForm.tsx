/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { mergeRefs } from "@/lib/helpers";
import { PostEditSchema, TPostSchema } from "@/lib/schemas/postSchema";

import { Send } from "lucide-react";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { useClientSession } from "@/hooks/useClientSession";
import { ImageUploadResponse } from "@/types/types";
import { useRouter } from "next/navigation";
import CreatePostImagePreviews from "./CreatePostImagePreviews";
import EditPostImagesPreviews from "./EditPostImagesPreview";
import ImageUploader from "./ImageUploader";
import MiniSpinner from "./MiniSpinner";
import { uploadImages } from "@/lib/api/uploadImages";
import toast from "react-hot-toast";
import { usePost } from "@/contexts/PostContext";
import { editPost } from "@/lib/actions/postActions";

export default function EditPostForm({
  form,
}: {
  form: UseFormReturn<PostEditSchema>;
}) {
  const { user, isPending, isAuthenticated } = useClientSession();
  const { id: postId, images: postImages } = usePost();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  if (isPending) {
    return (
      <div className="p-8">
        <MiniSpinner text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <div className="p-4">Redirecting to sign in...</div>;
  }

  const userId = user!.id;

  const content = form.watch("content");
  const images = form.watch("images");

  const isSubmitting = form.formState.isSubmitting;

  function handleAutoResizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleImageUpload(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<TPostSchema, "images">,
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
        !existingSignatures.has(
          `${file.name}-${file.size}-${file.lastModified}`,
        ),
    );

    field.onChange([...prevImages, ...uniqueNewFiles].slice(0, 2));

    e.target.value = "";
  }

  function removeNewImage(file: File) {
    const signature = `${file.name}-${file.size}-${file.lastModified}`;
    const newImages = images.filter(
      (img) =>
        !(img instanceof File) ||
        `${img.name}-${img.size}-${img.lastModified}` !== signature,
    );
    form.setValue("images", newImages);
    form.trigger("images");
  }

  function removeExistingImage(fileId: string) {
    const newImages = images.filter(
      (img) => img instanceof File || img.fileId !== fileId,
    );
    form.setValue("images", newImages);
    form.trigger("images");
  }

  // Edit post
  async function onSubmit({ content, images }: PostEditSchema) {
    const toastId = toast.loading("Uploading your post...", {
      duration: Infinity,
    });

    const filesToUpload = images.filter(
      (image) => image instanceof File,
    ) as File[];

    const prevImages = images.filter(
      (image) => !(image instanceof File),
    ) as ImageUploadResponse[];

    let imagesUploadRes;

    if (filesToUpload.length > 0) {
      imagesUploadRes = await uploadImages(filesToUpload);

      if (!imagesUploadRes.success) {
        toast.error("Failed to upload images, please try again", {
          id: toastId,
          duration: 3000,
        });
        return;
      }
    }

    // const imagesToDeleteId = prevImages.reduce((imagesIds: string[], image) => {
    //   if (newImages.map((image) => image.fileId).includes(image.fileId)) {
    //     return imagesIds;
    //   } else {
    //     return [...imagesIds, image.fileId];
    //   }
    // }, []);

    const newImages = imagesUploadRes?.data
      ? [...imagesUploadRes.data, ...prevImages]
      : prevImages;

    // console.log(newImages.map((image) => image.fileId));
    // console.log(postImages.map((image) => image.fileId));

    const newImagesIds = new Set(newImages.map((image) => image.fileId));
    const imagesToDeleteId = postImages
      .filter((image) => !newImagesIds.has(image.fileId))
      .map((image) => image.fileId);

    const editRes = await editPost(
      { content, images: imagesUploadRes?.data || [] },
      imagesToDeleteId,
      userId,
      postId,
    );

    console.log(imagesToDeleteId);
    console.log(postImages.map((image) => image.fileId));

    if (editRes.success) {
      toast.success(editRes.message, { id: toastId, duration: 2000 });
      form.reset();
      router.refresh();
    } else {
      toast.error(editRes.message, { id: toastId, duration: 2000 });
    }
  }

  //   Something else

  const newUploadImages: File[] = [];
  const prevImages: ImageUploadResponse[] = [];

  images.forEach((image) => {
    if (image instanceof File) {
      newUploadImages.push(image);
    } else {
      prevImages.push(image);
    }
  });

  console.log(form.formState.errors.images);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="scrollbar-hide flex flex-1 flex-col space-y-2 overflow-y-scroll"
      >
        <div
          className={`flex-1 overflow-y-auto`}
          //   onClick={(e) => onFocus?.(e, textareaRef)}
        >
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <textarea
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      handleAutoResizeTextarea();
                    }}
                    ref={mergeRefs(field.ref, textareaRef)}
                    placeholder="What's on your mind?"
                    className="w-full resize-none bg-transparent leading-relaxed font-normal text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={1}
                    disabled={isSubmitting}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <CreatePostImagePreviews
            disabled={isSubmitting}
            images={newUploadImages}
            removeImage={removeNewImage}
          />
          <EditPostImagesPreviews
            images={prevImages}
            removeImage={removeExistingImage}
          />
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => handleImageUpload(e, field)}
                  ref={mergeRefs(field.ref, inputRef)}
                  onBlur={field.onBlur}
                  name={field.name}
                  className="hidden"
                />
              </FormControl>

              <ImageUploader
                imagesLength={images.length}
                inputRef={inputRef}
                disabled={isSubmitting}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {form.formState.errors.content && (
            <p className="text-sm text-red-600">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-end">
          <Button
            type="submit"
            disabled={
              (!content.trim() && images.length === 0) ||
              !form.formState.isValid ||
              isSubmitting
            }
            className="flex w-24 items-center gap-x-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            {!isSubmitting ? (
              <>
                <Send className="size-4" />
                <span className="text-md">Post</span>
              </>
            ) : (
              <>
                <MiniSpinner text="Posting..." />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
