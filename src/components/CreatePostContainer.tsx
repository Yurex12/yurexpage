import { postSchema, TPostSchema } from "@/lib/schemas/postSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmAction from "./ConfirmAction";
import CreatePostForm from "./CreatePostForm";
import CreatePostHeader from "./CreatePostHeader";
import { DialogContent, DialogTitle } from "./ui/dialog";

export default function CreatePostContainer({
  onClose,
}: {
  onClose: VoidFunction;
}) {
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);
  const form = useForm<TPostSchema>({
    resolver: zodResolver(postSchema),
    mode: "onChange",
    defaultValues: {
      content: "",
      images: [],
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const images = form.watch("images");
  const content = form.watch("content");

  function handleCloseDialog() {
    if (isSubmitting) return;

    if (images.length > 0 || content.trim().length > 0) {
      setOpenConfirmationDialog(true);
      return;
    }

    form.reset();
    onClose();
  }

  function handleConfirmedLeave() {
    setOpenConfirmationDialog(false);
    form.reset();
    onClose();
  }

  return (
    <>
      <DialogContent
        className="flex max-h-10/12 flex-col p-4 outline-0"
        showCloseButton={false}
        aria-describedby={undefined}
        onInteractOutside={(e) => {
          e.preventDefault();
          handleCloseDialog();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          handleCloseDialog();
        }}
      >
        <DialogTitle className="sr-only">Post Modal</DialogTitle>
        <CreatePostHeader disabled={isSubmitting} />
        <CreatePostForm form={form} onPostUploadSuccess={onClose} />
      </DialogContent>

      <ConfirmAction
        open={openConfirmationDialog}
        name="post"
        onLeave={handleConfirmedLeave}
        onConfirmation={() => setOpenConfirmationDialog(false)}
      />
    </>
  );
}
