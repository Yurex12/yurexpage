import { prisma } from "@/lib/prisma";
import React from "react";
import Post from "./Post";

export default async function PostsList() {
  const posts = await prisma.post.findMany({
    include: {
      comments: true,
      images: true,
      postLikes: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts.length) return <p>No post found</p>;

  //   console.log(posts);

  return (
    <div className="space-y-2 sm:space-y-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
        // <div key={post.id}>Hello</div>
      ))}
    </div>
  );
}
