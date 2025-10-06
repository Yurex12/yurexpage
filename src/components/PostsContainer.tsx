import { cn } from "@/lib/utils";
import { ComponentProps, Suspense } from "react";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

export default function PostsContainer({ className }: ComponentProps<"div">) {
  // const ref = useScrollRestoration<HTMLDivElement>();

  return (
    <div
      className={cn("flex-1 space-y-2 pb-4 sm:space-y-4", className)}
      // ref={ref}
    >
      <CreatePost className="w-full max-w-140" />
      {/* <div className="space-y-2 sm:space-y-4">
        {[1, 2, 3, 4].map((num) => (
          <Post key={num} />
        ))}
      </div> */}
      <Suspense fallback={<p>Loading...</p>}>
        <PostsList />
      </Suspense>
    </div>
  );
}
