import { getServerSession } from "@/lib/getServerSession";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const session = await getServerSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { postId } = await params;

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      id: true,
      images: true,
      content: true,
    },
  });

  if (!post)
    return NextResponse.json({ message: "Post not found" }, { status: 404 });

  return NextResponse.json({ post });
}
