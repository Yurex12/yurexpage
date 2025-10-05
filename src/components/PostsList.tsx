import { prisma } from "@/lib/prisma";
import React from "react";
import Post from "./Post";
import { getServerSession } from "@/lib/getServerSession";

export default async function PostsList() {
  const { user } = await getServerSession();

  const posts = await prisma.post.findMany({
    include: {
      postLikes: {
        where: {
          userId: user.id,
        },
      },
      comments: true,
      images: true,
      user: {
        select: {
          name: true,
          displayUsername: true,
          image: true,
        },
      },
      _count: {
        select: {
          comments: true,
          postLikes: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!posts.length) return <p>No post found</p>;

  // console.log(JSON.stringify(posts, null, 2));

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
