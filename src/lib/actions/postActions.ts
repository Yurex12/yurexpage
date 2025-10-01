"use server";

import z from "zod";
import { postSchema, TPostSchema } from "../schemas/postSchema";
import { prisma } from "../prisma";

export async function createPost(data: TPostSchema, userId: string) {
  const validateFields = postSchema.safeParse(data);

  if (!validateFields.success) {
    return {
      success: false,
      message: "Please enter correct details",
      error: z.flattenError(validateFields.error),
      data: null,
    };
  }

  const { content, images } = validateFields.data;

  try {
    const newPost = await prisma.post.create({
      data: {
        content,
        images: {
          createMany: {
            data: [],
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
