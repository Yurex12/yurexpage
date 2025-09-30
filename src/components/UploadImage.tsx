"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { postSchema, TPostSchema } from "@/lib/schemas/postSchema";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useRef } from "react";
import { Plus } from "lucide-react";
import { mergeRefs } from "@/lib/helpers";

export default function UploadImage() {
  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      content: "",
      images: [],
    },
  });

  function onSubmit(values: TPostSchema) {
    console.log(values);
  }

  const postImages = form.watch("images");

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

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Content field */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Write your post..." {...field} />
              </FormControl>
              <FormDescription>
                This is the text content of your post.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images field */}
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={(e) => handleImageUpload(e, field)}
                  ref={mergeRefs(field.ref, inputRef)}
                  onBlur={field.onBlur}
                  name={field.name}
                  // className="hidden"
                />
              </FormControl>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={!(postImages.length < 2)}
                className="flex items-center space-x-1 rounded-lg bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blue-100"
              >
                <Plus className="h-4 w-4" />
                <span>Upload</span>
              </button>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>

      {postImages?.map((file, idx) => (
        <>
          <img
            key={idx}
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="h-20 w-20 object-cover"
          />
          <button
            onClick={() => {
              const newImages = postImages.filter(
                (image) => image.name !== file.name,
              );
              form.setValue("images", newImages);
              form.trigger("images");
            }}
          >
            remove image
          </button>
        </>
      ))}
    </Form>
  );
}
