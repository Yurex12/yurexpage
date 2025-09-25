import z from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      if (!val) return;
      if (val.length < 8) {
        ctx.addIssue({
          code: "custom",
          message: "username must be at least 8 characters.",
        });
      }

      if (val.length > 15) {
        ctx.addIssue({
          code: "custom",
          message: "username should not be more than 15 characters.",
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
