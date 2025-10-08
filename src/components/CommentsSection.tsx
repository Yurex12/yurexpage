import { useComments } from "@/hooks/useComments";
import MiniSpinner from "./MiniSpinner";
import CommentList from "./CommentList";

export default function CommentsSection({ postId }: { postId: string }) {
  const { comments, isPending, error } = useComments(postId);

  if (isPending) {
    return <MiniSpinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!comments?.length) {
    return <p className="text-center">No comments.</p>;
  }
  return <CommentList comments={comments} />;
}
