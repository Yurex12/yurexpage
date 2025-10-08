import MobilePostDetials from "@/components/MobilePostDetials";
import { PostProvider } from "@/contexts/PostContext";
import { getServerSession } from "@/lib/getServerSession";
import { prisma } from "@/lib/prisma";

export default async function page({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { user } = await getServerSession();
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      postLikes: {
        where: {
          userId: user.id,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              name: true,
              displayUsername: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
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
  });

  if (!post) return null;

  console.log(post, postId);

  return (
    <PostProvider post={post}>
      <MobilePostDetials />
    </PostProvider>
  );
}
