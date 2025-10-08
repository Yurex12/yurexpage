"use server";

import { revalidatePath } from "next/cache";
import z from "zod";
import { prisma } from "../prisma";
import { serverPostSchema, TServerPostSchema } from "../schemas/postSchema";

export async function createPost(data: TServerPostSchema, userId: string) {
  const validateFields = serverPostSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Please enter correct details",
      error: z.flattenError(validateFields.error),
      data: null,
    };
  }

  const { content, images } = validateFields.data;

  const processedImage = images.length
    ? images.map((image) => ({
        userId,
        url: image.url,
        fileId: image.fileId,
        name: image.name,
      }))
    : [];

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        images: {
          createMany: {
            data: processedImage,
          },
        },
        notifications: {
          createMany: {
            data: [
              { type: "LIKE_POST", userId },
              { type: "COMMENT", userId },
            ],
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return {
      success: true,
      data: newPost,
      error: null,
      message: "Post created successfully.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: null,
      error,
      message: "Post could not be created.",
    };
  }
}

export async function deletePost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  if (!userId || !postId) {
    return {
      success: false,
      data: null,
      error: "Post could not be deleted.",
      message: "Invalid request, pass required fields.",
    };
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        success: false,
        data: null,
        error: "POST_NOT_FOUND", // ✅ Specific error code
        message: "This post is no longer available",
      };
    }

    if (post.userId !== userId) {
      return {
        success: false,
        data: null,
        error: "UNAUTHORIZED",
        message: "You are not authorized to delete this post.",
      };
    }

    const deletedPost = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: `Post  deleted successfully.`,
      data: deletedPost,
      error: null,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: null,
      error,
      message: "Post could not be deleted",
    };
  }
}

// Like post
export async function likePost({
  postId,
  userId,
  postAuthorId,
  notificationId,
}: {
  postId: string;
  userId: string;
  postAuthorId: string;
  notificationId: string;
}) {
  if (!userId || !postId || !postAuthorId) {
    return {
      success: false,
      type: "error",
      data: null,
      error: "Invalid request, pass required fields.",
      message: "could not like post",
    };
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return {
        success: false,
        type: "error",
        data: null,
        error: "POST_NOT_FOUND",
        message: "This post is no longer available",
      };
    }

    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });

    let likedPost;
    let type: "LIKE" | "UNLIKE" = "LIKE";

    await prisma.$transaction(async (tx) => {
      if (!existingLike) {
        likedPost = await tx.postLike.create({
          data: { postId, userId },
        });

        await tx.notificationTrigger.create({
          data: { notificationId, userId },
        });
      } else {
        type = "UNLIKE";

        likedPost = await tx.postLike.delete({
          where: { id: existingLike.id },
        });

        await tx.notificationTrigger.delete({
          where: {
            userId_notificationId: { userId, notificationId },
          },
        });
      }
    });

    return {
      success: true,
      error: null,
      type,
      data: likedPost,
      message:
        type === "LIKE" ? "You liked this post." : "You unliked this post.",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: null,
      type: "error",
      error,
      message: "Could not like/unlike post",
    };
  }
}

export async function createComment({
  content,
  postId,
  userId,
  notificationId,
}: {
  content: string;
  postId: string;
  userId: string;
  notificationId: string;
}) {
  if (!userId || !postId || !content || !notificationId) {
    return {
      success: false,
      data: null,
      error: "Invalid request, pass required fields.",
      message: "could not comment",
    };
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        success: false,
        data: null,
        error: "POST_NOT_FOUND",
        message: "This post is no longer available",
      };
    }

    let newComment;

    await prisma.$transaction(async (tx) => {
      newComment = await tx.comment.create({
        data: {
          postId: post.id,
          content,
          userId,
        },
      });

      const existingNotification = await tx.notificationTrigger.findUnique({
        where: {
          userId_notificationId: { userId, notificationId },
        },
      });

      if (!existingNotification) {
        await tx.notificationTrigger.create({
          data: { notificationId, userId },
        });
      }
    });

    // revalidatePath(`/posts/${postId}`);

    return {
      success: true,
      data: newComment,
      error: null,
      message: "comment was successful",
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      data: null,
      error,
      message: "Could not comment on post",
    };
  }
}
