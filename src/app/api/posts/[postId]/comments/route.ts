import { getServerSession } from "@/lib/getServerSession";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ postId: string }> },
) {
  const session = await getServerSession();

  const { postId } = await params;

  if (!session.session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          displayUsername: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({ comments });
}
