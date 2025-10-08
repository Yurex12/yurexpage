import CommentPostBtn from "./CommentPostBtn";
import LikePostBtn from "./LikePostBtn";

export default function PostInteraction({
  onClickComment,
}: {
  onClickComment: VoidFunction;
}) {
  return (
    <div className="flex items-center">
      <LikePostBtn />
      <CommentPostBtn onClick={onClickComment} />
    </div>
  );
}
