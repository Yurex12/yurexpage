/* eslint-disable @next/next/no-img-element */
"use client";

import { usePost } from "@/contexts/PostContext";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import { useClientSession } from "@/hooks/useClientSession";
import { createComment } from "@/lib/actions/postActions";
import { mergeRefs } from "@/lib/helpers";
import { TCommentSchema } from "@/lib/schemas/postSchema";
import { SendHorizonalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const CommentBox = forwardRef<
  { focus: VoidFunction },
  { form: UseFormReturn<TCommentSchema>; onUploaded: VoidFunction }
>(({ form, onUploaded }, ref) => {
  const { textareaRef, handleTextAreaHeight } = useAutoResizeTextarea();
  const { notifications, id: postId } = usePost();

  const { user } = useClientSession();

  const router = useRouter();

  const userId = user?.id as string;

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

  const notificationId = notifications.find(
    (notification) => notification.type === "COMMENT",
  )?.id as string;

  const content = form.watch("content");

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(values: TCommentSchema) {
    const res = await createComment({
      content: values.content,
      postId,
      userId,
      notificationId,
    });

    if (res.success) {
      onUploaded();
      form.reset();
      toast.success(res.message);
    } else if (!res.success && res.error === "POST_NOT_FOUND") {
      toast.error(res.message || "This post has been deleted");
      router.refresh();
    } else {
      toast.error(res.message);
    }
  }

  return (
    <div className="w-full rounded-xl bg-white p-4 shadow">
      <div className="relative flex items-start gap-3">
        <img src="/c.jpg" alt="logo" className="h-10 w-10 rounded-full" />

        <Form {...form}>
          <form
            className="relative flex-1 flex-row"
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
