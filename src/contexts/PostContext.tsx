"use client";

import { useClientSession } from "@/hooks/useClientSession";
import { likePost } from "@/lib/actions/postActions";
import { PostWithRelations } from "@/types/types";
import {
  createContext,
  ReactNode,
  useContext,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import toast from "react-hot-toast";

type PostProvider = PostWithRelations & {
  optimisticLike: boolean;
  handleLike: VoidFunction;
};

const postContext = createContext<PostProvider | undefined>(undefined);

export function PostProvider({
  children,
  post,
}: {
  children: ReactNode;
  post: PostWithRelations;
}) {
  const { postLikes, id: postId } = post;

  const [isPending, startTransition] = useTransition();
  const { user } = useClientSession();
  const [hasLiked, setHasLiked] = useState(postLikes.length > 0);

  const userId = user?.id as string;

  const [optimisticLike, likeOptimistic] = useOptimistic(
    hasLiked,
    (curState, newLikedState: boolean) => newLikedState,
  );

  function handleLike() {
    startTransition(async () => {
      likeOptimistic(!hasLiked);

      const res = await likePost({ postId, userId });

      if (res.success) {
        if (res.type === "like") {
          setHasLiked(true);
        }
        if (res.type === "unlike") {
          setHasLiked(false);
        }
      } else {
        toast.error("Something went wrong");
      }
    });
  }
  const value = { ...post, handleLike, optimisticLike };
  return <postContext.Provider value={value}>{children}</postContext.Provider>;
}

export function usePost() {
  const context = useContext(postContext);

  if (!context) {
    throw new Error("Post context was used outside post provider.");
  }

  return context;
}
