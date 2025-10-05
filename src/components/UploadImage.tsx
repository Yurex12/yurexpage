"use client";

import { useOptimistic, useState, useTransition } from "react";

const postsData = [
  { id: 1, content: "Hello world" },
  { id: 2, content: "Welcome" },
  { id: 3, content: "Nice" },
  { id: 4, content: "Get them" },
  { id: 5, content: "welcome" },
  { id: 6, content: "No issue" },
];

export default function UploadImage() {
  const [posts, setPosts] = useState(postsData);
  const [isPending, startTransition] = useTransition();
  const [optimisticPosts, deleteOptimisticPost] = useOptimistic(
    posts,
    (currentPosts, postIdToDelete) => {
      return currentPosts.filter((post) => post.id !== postIdToDelete);
    },
  );

  async function deletePost(postId: number) {
    startTransition(async () => {
      deleteOptimisticPost(postId);

      try {
        // Mock server operation
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            const shouldFail = Math.random() > 0.5;

            if (true) {
              reject(new Error("Failed to delete"));
            } else {
              resolve(true);
            }
          }, 2000);
        });

        // Only update real state if successful
        setPosts((curPosts) => curPosts.filter((post) => post.id !== postId));
      } catch (error) {
        // If it fails, do nothing - the optimistic update will revert automatically
        console.error("Delete failed:", error);
        // Optional: show a toast notification
      }
    });
  }
  return (
    <div className="p-4">
      {optimisticPosts.map((post) => (
        <div key={post.id} className="flex gap-x-6">
          <p>{post.content}</p>
          <button
            onClick={() => deletePost(post.id)}
            // disabled={isPending}
            // className="disabled:cursor-not-allowed disabled:text-gray-200"
          >
            Delete {post.id}
          </button>
        </div>
      ))}
    </div>
  );
}
