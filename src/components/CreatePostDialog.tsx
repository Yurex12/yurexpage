"use client";

import { ChangeEvent, useEffect, useRef } from "react";

import { Image as ImageIcon, Plus, Send, X } from "lucide-react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "./ui/dialog";
import { Button } from "./ui/button";

import CreatePostImagePreviews from "./CreatePostImagePreviews";

import { MAX_IMAGE_SIZE } from "@/constants";
import { mergeRefs } from "@/lib/helpers";

import { TPostSchema } from "@/lib/schemas/postSchema";
import toast from "react-hot-toast";

export default function CreatePostDialog({
  content,
  images,
  form,
}: {
  content: string;
  images: File[];
  form: UseFormReturn<{
    content: string;
    images: File[];
  }>;
}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const isLarge = images.some((image) => image.size > MAX_IMAGE_SIZE);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  function handleTextChange() {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
  }

  function onSubmit(values: TPostSchema) {
    if (!values.content.trim() && !values.images.length) {
      toast.error("Please provide either content or at least one image");
      return;
    }
    console.log(values);
  }

  function handleImageUpload(
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<
      {
        content: string;
        images: File[];
      },
      "images"
    >,
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

  function removeImage(file: File) {
    const signature = `${file.name}-${file.size}-${file.lastModified}`;
    const newImages = images.filter(
      (img) => `${img.name}-${img.size}-${img.lastModified}` !== signature,
    );
    form.setValue("images", newImages);
    form.trigger("images");
  }

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900">Create Post</h2>
        <DialogClose asChild>
          <button className="rounded-full p-2 transition-colors hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </DialogClose>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="scrollbar-hide flex flex-1 flex-col space-y-2 overflow-y-scroll"
        >
          <div className="flex-1 overflow-y-auto">
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
                        handleTextChange();
                      }}
                      ref={mergeRefs(field.ref, textareaRef)}
                      placeholder="What's on your mind?"
                      className="w-full resize-none bg-transparent leading-relaxed font-normal outline-none placeholder:text-gray-500"
                      rows={1}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <CreatePostImagePreviews
              images={images}
              removeImage={removeImage}
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

                <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <div className="flex items-center space-x-3">
                    <ImageIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      Add images ({images.length}/2)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={!(images.length < 2)}
                    className="flex items-center space-x-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-100"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Upload</span>
                  </button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {form.formState.errors.content && (
              <p className="text-sm text-red-700">
                {form.formState.errors.content.message}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-end">
            <Button
              type="submit"
              disabled={
                (!content.trim() && images.length === 0) ||
                isLarge ||
                content.length > 1000
              }
              className="flex w-24 items-center gap-x-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Send className="size-4" />
              <span className="text-md">Post</span>
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
