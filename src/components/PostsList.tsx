import { PostsProvider } from "@/contexts/PostsContext";
import { getServerSession } from "@/lib/getServerSession";
import { prisma } from "@/lib/prisma";
import Posts from "./Posts";

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
      notifications: {
        select: {
          type: true,
          id: true,
        },
      },
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

  return (
    <PostsProvider posts={posts} currentUserId={user.id}>
      <Posts />
    </PostsProvider>
  );
}
