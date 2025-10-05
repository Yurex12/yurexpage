"use server";

import z from "zod";
import { prisma } from "../prisma";
import { serverPostSchema, TServerPostSchema } from "../schemas/postSchema";
import { revalidatePath } from "next/cache";

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
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // revalidatePath("/");

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
      error: "Invalid request, pass required fields.",
      message: "Post could not be deleted.",
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
        error: "Post not found",
        message: "Post does not exist.",
      };
    }

    if (post.userId !== userId) {
      return {
        success: false,
        data: null,
        error: "unauthorized",
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
      message: `Post with id #${postId} deleted successfully.`,
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
}: {
  postId: string;
  userId: string;
}) {
  if (!userId || !postId) {
    return {
      success: false,
      type: "error",
      data: null,
      error: "Invalid request, pass required fields.",
      message: "could not like post",
    };
  }

  try {
    const existingLike = await prisma.postLike.findUnique({
      where: {
        postId_userId: { postId, userId },
      },
    });

    let likedPost;
    let type: "like" | "unlike";

    if (!existingLike) {
      likedPost = await prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });
      type = "like";
    } else {
      likedPost = await prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      type = "unlike";
    }

    return {
      success: true,
      error: null,
      type,
      data: likedPost,
      message:
        type === "like" ? "You liked this post." : "You unliked this post.",
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
