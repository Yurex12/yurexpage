"use client";
import { useClientSession } from "@/hooks/useClientSession";
import { deletePost } from "@/lib/actions/postActions";
import { PostWithRelations } from "@/types/types";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useOptimistic,
  useTransition,
} from "react";
import toast from "react-hot-toast";

type PostProvider = {
  posts: PostWithRelations[];
  handleDeletePost: (value: string) => void;
};

const PostsContext = createContext<PostProvider | null>(null);

export function PostsProvider({
  children,
  posts,
}: {
  posts: PostWithRelations[];
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticPosts, deleteOptimistic] = useOptimistic(
    posts,
    (curPosts, postToDeleteId: string) => {
      return curPosts.filter((post) => post.id !== postToDeleteId);
    },
  );

  const router = useRouter();

  const { user } = useClientSession();
  const userId = user?.id as string;

  function handleDeletePost(postToDeleteId: string) {
    startTransition(async () => {
      deleteOptimistic(postToDeleteId);
      const res = await deletePost({ postId: postToDeleteId, userId });
      if (res.success) {
        toast.success("Post deleted succesfully.");
        // router.refresh();
      } else {
        toast.error("Post could not be deleted, try again");
      }
    });
  }

  const value = { posts: optimisticPosts, handleDeletePost };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) throw new Error("Posts context was used outside post provider");

  return context;
}
