/* eslint-disable @next/next/no-img-element */
import { usePost } from "@/contexts/PostContext";
import { PostEditSchema, postEditSchema } from "@/lib/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import EditPostForm from "./EditPostForm";
import PostFormHeader from "./PostFormHeader";
import { DialogContent, DialogTitle } from "./ui/dialog";

export default function UpdatePostDialog({
  onClose,
}: {
  onClose: VoidFunction;
}) {
  const { content, images } = usePost();

  const form = useForm<PostEditSchema>({
    mode: "onChange",
    resolver: zodResolver(postEditSchema),
    defaultValues: {
      content: content || "",
      images: images || [],
    },
  });
  const isSubmitting = form.formState.isSubmitting;

  return (
    <DialogContent
      className="flex max-h-10/12 flex-col p-4 outline-0 sm:max-w-md"
      showCloseButton={false}
      aria-describedby={undefined}
      // onInteractOutside={(e) => {
      //   e.preventDefault();
      //   // handleCloseDialog();
      // }}
      // onEscapeKeyDown={(e) => {
      //   e.preventDefault();
      //   // handleCloseDialog();
      // }}
    >
      <DialogTitle className="sr-only">Post Modal</DialogTitle>
      <PostFormHeader
        disabled={isSubmitting}
        onClose={onClose}
        text="Edit post"
      />

      <EditPostForm form={form} />

      {/*    <ConfirmAction
            // open={openConfirmationDialog}
            // name="post"
            // onLeave={handleConfirmedLeave}
            // onConfirmation={() => setOpenConfirmationDialog(false)}
          /> */}
    </DialogContent>
  );
}
