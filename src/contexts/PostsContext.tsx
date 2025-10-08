"use client";
import { deletePost } from "@/lib/actions/postActions";
import { PostWithRelations } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useOptimistic,
  useTransition,
} from "react";
import toast from "react-hot-toast";

type PostContext = {
  posts: PostWithRelations[];
  handleDeletePost: (value: string) => void;
};

type PostProvider = {
  posts: PostWithRelations[];
  children: ReactNode;
  currentUserId: string;
};

const PostsContext = createContext<PostContext | null>(null);

export function PostsProvider({
  children,
  posts,
  currentUserId,
}: PostProvider) {
  const [isPending, startTransition] = useTransition();

  const [optimisticPosts, deleteOptimistic] = useOptimistic(
    posts,
    (curPosts, postToDeleteId: string) => {
      return curPosts.filter((post) => post.id !== postToDeleteId);
    },
  );

  function handleDeletePost(postToDeleteId: string) {
    startTransition(async () => {
      deleteOptimistic(postToDeleteId);
      const res = await deletePost({
        postId: postToDeleteId,
        userId: currentUserId,
      });
      if (res.success) {
        toast.success("Post deleted succesfully.");
      } else {
        toast.error("Post could not be deleted, try again");
      }

      console.log(res);
    });
  }

  const value = { posts: optimisticPosts, handleDeletePost };
  return (
    <PostsContext.Provider value={value}>{children}</PostsContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostsContext);
  if (!context) return null;
  //  throw new Error("Posts context was used outside post provider");

  return context;
}
