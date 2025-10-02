"use server";

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
