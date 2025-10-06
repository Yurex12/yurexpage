"use client";

import { useClientSession } from "@/hooks/useClientSession";
import { likePost } from "@/lib/actions/postActions";
import { PostWithRelations } from "@/types/types";
import { useRouter } from "next/navigation";
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
  const { postLikes, id: postId, userId: postAuthorId, notifications } = post;

  const [isPending, startTransition] = useTransition();
  const { user } = useClientSession();

  const router = useRouter();

  const [hasLiked, setHasLiked] = useState(postLikes.length > 0);

  const likeNotificationId = notifications.find(
    (notification) => notification.type === "LIKE_POST",
  )?.id as string;

  const userId = user?.id as string;

  const [optimisticLike, likeOptimistic] = useOptimistic(
    hasLiked,
    (curState, newLikedState: boolean) => newLikedState,
  );

  function handleLike() {
    startTransition(async () => {
      likeOptimistic(!hasLiked);

      const res = await likePost({
        postId,
        userId,
        postAuthorId,
        notificationId: likeNotificationId,
      });

      if (res.success) {
        if (res.type === "LIKE") {
          setHasLiked(true);
        }
        if (res.type === "UNLIKE") {
          setHasLiked(false);
        }
      } else if (!res.success && res.error === "POST_NOT_FOUND") {
        toast.error(res.message);
        router.refresh();
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
