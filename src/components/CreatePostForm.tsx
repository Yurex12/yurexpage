"use client";
import { ChangeEvent, MouseEvent, RefObject, useEffect, useRef } from "react";

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
import { TPostSchema } from "@/lib/schemas/postSchema";

import { Send } from "lucide-react";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";

import { useClientSession } from "@/hooks/useClientAuth";
import { createPost } from "@/lib/actions/postActions";
import toast from "react-hot-toast";
import CreatePostImagePreviews from "./CreatePostImagePreviews";
import ImageUploader from "./ImageUploader";
import { uploadImages } from "@/lib/api/uploadImages";

export default function CreatePostForm({
  form,
  handleFocus,
  containerClassName,
}: {
  containerClassName?: string;
  form: UseFormReturn<TPostSchema>;
  handleFocus?: (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    el: RefObject<HTMLTextAreaElement | null>,
  ) => void;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const content = form.watch("content");
  const images = form.watch("images");

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const { data } = useClientSession();

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

  function removeImage(file: File) {
    const signature = `${file.name}-${file.size}-${file.lastModified}`;
    const newImages = images.filter(
      (img) => `${img.name}-${img.size}-${img.lastModified}` !== signature,
    );
    form.setValue("images", newImages);
    form.trigger("images");
  }

  async function onSubmit(postData: TPostSchema) {
    console.log(postData);

    await uploadImages(postData.images);

    // const res = await createPost(postData, data?.user.id as string);

    console.log("hi");

    // console.log(res);

    // if (res.success) {
    //   toast.success(res.message);
    // } else {
    //   toast.error(res.message);
    // }

    // textareaRef.current!.style.height = "auto";
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="scrollbar-hide flex flex-1 flex-col space-y-2 overflow-y-scroll"
      >
        <div
          className={`flex-1 overflow-y-auto ${containerClassName}`}
          onClick={(e) => handleFocus?.(e, textareaRef)}
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
                    className="w-full resize-none bg-transparent leading-relaxed font-normal text-gray-900 outline-none placeholder:text-gray-500"
                    rows={1}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <CreatePostImagePreviews images={images} removeImage={removeImage} />
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

              <ImageUploader imagesLength={images.length} inputRef={inputRef} />

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
              !form.formState.isValid
            }
            className="flex w-24 items-center gap-x-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" />
            <span className="text-md">Post</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}
