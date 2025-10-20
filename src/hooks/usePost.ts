import { useQuery } from "@tanstack/react-query";

export function usePost(postId: string) {
  const {
    data: post,
    isPending: isLoadingPost,
    error: postError,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPost(postId),
  });

  return { post, isLoadingPost, postError };
}

async function getPost(postId: string) {
  try {
    const res = await fetch(`/api/posts/${postId}`);

    if (!res.ok) {
      throw new Error("Could not fetch post");
    }
    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw error;
  }
}
