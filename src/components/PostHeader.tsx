import PostDropdownActions from "./PostDropdownActions";
import UserDetails from "./UserDetails";

export default function PostHeader({
  onUpdatePost,
  onClose,
}: {
  onUpdatePost: VoidFunction;
  onClose?: VoidFunction;
}) {
  return (
    <div className="flex items-start justify-between px-4">
      <UserDetails />
      <PostDropdownActions onUpdatePost={onUpdatePost} onClose={onClose} />
    </div>
  );
}
