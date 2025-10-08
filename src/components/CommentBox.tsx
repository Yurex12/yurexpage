/* eslint-disable @next/next/no-img-element */
"use client";

import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import { mergeRefs } from "@/lib/helpers";
import { TCommentSchema } from "@/lib/schemas/postSchema";
import { SendHorizonalIcon } from "lucide-react";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const CommentBox = forwardRef<
  { focus: VoidFunction },
  { form: UseFormReturn<TCommentSchema> }
>(({ form }, ref) => {
  const { textareaRef, handleTextAreaHeight } = useAutoResizeTextarea();

  useImperativeHandle(
    ref,
    () => ({
      focus: () => textareaRef.current?.focus(),
    }),
    [textareaRef],
  );

  useEffect(() => {
    textareaRef.current?.focus();
  }, [textareaRef]);

  const content = form.watch("content");

  const isSubmitting = form.formState.isSubmitting;

  function onSubmit(values: TCommentSchema) {
    console.log(values);
  }

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow">
      <div className="relative flex items-start gap-3">
        <img src="/c.jpg" alt="logo" className="h-10 w-10 rounded-full" />

        <Form {...form}>
          <form
            className="cl relative flex-1 flex-row"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-end">
                    <FormControl>
                      <textarea
                        {...field}
                        ref={mergeRefs(textareaRef, field.ref)}
                        onChange={(e) => {
                          handleTextAreaHeight();
                          field.onChange(e.target.value);
                        }}
                        placeholder="Write a comment..."
                        className="w-full resize-none rounded-lg bg-gray-100 p-3 pr-10 text-sm focus:outline-none"
                      />
                    </FormControl>

                    {content.length > 0 && (
                      <button
                        disabled={
                          isSubmitting ||
                          !content.length ||
                          !form.formState.isValid
                        }
                        className="p-2 text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-gray-400 disabled:opacity-50"
                      >
                        <SendHorizonalIcon />
                      </button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
});

CommentBox.displayName = "CommentBox";

export default CommentBox;
