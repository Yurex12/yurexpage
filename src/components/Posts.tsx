"use client";

import { usePosts } from "@/contexts/PostsContext";
import Post from "./Post";

export default function Posts() {
  const { posts } = usePosts();
  return (
    <div className="space-y-2 sm:space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
