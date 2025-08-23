import Post from "./Post";
import CreatePost from "./CreatePost";

export default function Posts() {
  return (
    <div className="scrollbar-hide flex-1 space-y-2 overflow-y-scroll pb-4 sm:space-y-4 sm:pt-4 xl:mt-4 xl:pt-0">
      <CreatePost />
      <div className="space-y-2 sm:space-y-4">
        {[1, 2, 3, 4].map((num) => (
          <Post key={num} />
        ))}
      </div>
    </div>
  );
}
