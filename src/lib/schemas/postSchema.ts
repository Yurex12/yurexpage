import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(1000, "Content should not be more than 1000 characters"),

    images: z
      .array(z.instanceof(File))
      .max(2, "Maximum 2 images are allowed")
      .refine((files) => files.every((file) => file.size <= MAX_FILE_SIZE), {
        message: "Each file should be less than 5MB",
      })
      .refine(
        (files) =>
          files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
        { message: "Only JPEG, PNG, and WebP images are allowed" },
      ),
  })
  .refine((data) => data.content.trim().length > 0 || data.images.length > 0, {
    error: "Please provide either content or at least one image",
    // path: ["content"],
  });

export const postEditSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(1000, "Content should not be more than 1000 characters"),

    images: z
      .array(
        z.union([
          z.instanceof(File),
          z.object({
            fileId: z.string(),
            url: z.string(),
            name: z.string(),
          }),
        ]),
      )
      .max(2, "Maximum 2 images are allowed")
      .refine(
        (images) =>
          images.every((img) => {
            if (img instanceof File) {
              return img.size <= MAX_FILE_SIZE;
            }
            return true; // existing images are already validated
          }),
        {
          message: "Each file should be less than 5MB",
        },
      )
      .refine(
        (images) =>
          images.every((img) => {
            if (img instanceof File) {
              return ACCEPTED_IMAGE_TYPES.includes(img.type);
            }
            return true; // existing images are already validated
          }),
        { message: "Only JPEG, PNG, and WebP images are allowed" },
      ),
  })
  .refine((data) => data.content.trim().length > 0 || data.images.length > 0, {
    error: "Please provide either content or at least one image",
  });

export const serverPostSchema = z
  .object({
    content: z
      .string()
      .trim()
      .max(1000, "Content should not be more than 1000 characters"),

    images: z
      .array(
        z.object({
          fileId: z.string(),
          name: z.string(),
          url: z.url(),
        }),
      )
      .max(2, "Maximum 2 images are allowed"),
  })
  .refine(
    (data) =>
      Boolean(data.content.trim().length) || Boolean(data.images.length),
    {
      error: "Please provide either content or at least one image",
    },
  );

export const commentSchema = z
  .object({
    content: z.string().max(500, "Content should be less than 500 chars"),
  })
  .refine((data) => data.content.length > 0, {
    error: "comment cannot be empty",
    // path: ['content']
  });

export type TPostSchema = z.infer<typeof postSchema>;
export type TServerPostSchema = z.infer<typeof serverPostSchema>;
export type PostEditSchema = z.infer<typeof postEditSchema>;

export type TCommentSchema = z.infer<typeof commentSchema>;
