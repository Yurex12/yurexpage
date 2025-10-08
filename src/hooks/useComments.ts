import { CommentsWithRelations } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

export function useComments(postId: string) {
  const { data, error, isPending } = useQuery<CommentsWithRelations[]>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
  });
  return { comments: data, error, isPending };
}

async function getComments(postId: string) {
  try {
    const res = await fetch(`/api/posts/${postId}/comments`);

    if (!res.ok) {
      throw new Error("Could not fetch comments");
    }

    const data = await res.json();

    return data.comments;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    throw error;
  }
}
