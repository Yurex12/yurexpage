import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const postSchema = z.object({
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
});

export type TPostSchema = z.infer<typeof postSchema>;
