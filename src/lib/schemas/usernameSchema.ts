import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "@/constants";
import z from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) return;
      if (val.length < MIN_USERNAME_LENGTH) {
        ctx.addIssue({
          code: "custom",
          message: `username must be at least ${MIN_USERNAME_LENGTH} characters.`,
        });
      }

      if (val.length > MAX_USERNAME_LENGTH) {
        ctx.addIssue({
          code: "custom",
          message: `username should not be more than ${MAX_USERNAME_LENGTH} character.`,
        });
      }

      if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        ctx.addIssue({
          code: "custom",
          message: "username can only contain letters, numbers, and '_'",
        });
      }
    }),
});

export type TUsernameSchema = z.infer<typeof usernameSchema>;
