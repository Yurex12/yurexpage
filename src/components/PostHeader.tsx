import PostDropdownActions from "./PostDropdownActions";
import UserDetails from "./UserDetails";

export default function PostHeader() {
  return (
    <div className="flex items-start justify-between px-4">
      <UserDetails />
      <PostDropdownActions />
    </div>
  );
}
