import z from "zod";

export const signupSchema = z
  .object({
    email: z.email("Please enter a valid email address.").trim().toLowerCase(),
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password must be less than 25 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().trim().min(1, "Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

// schema for DB insert (no confirmPassword)
export const signupSchemaWithoutConfirmPassword = signupSchema.omit({
  confirmPassword: true,
});

export const signinSchema = z.object({
  identifier: z.union([
    z.email("Please enter a valid email address.").trim().toLowerCase(),
    z.string().trim().min(1, "Username is required."),
  ]),
  password: z.string().trim().min(1, "Password is required"),
  rememberMe: z.boolean(),
});

export const serverSigninSchema = z.object({
  identifier: z.union([
    z.email("Please enter a valid email address.").trim().toLowerCase(),
    z
      .string()
      .trim()
      .min(8, "Username must be at least 8 characters")
      .max(15, "Username must be less than 15 characters"),
  ]),
  password: z.string().trim().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean(),
});

export type TSignupSchema = z.infer<typeof signupSchema>;

export type TSigninSchema = z.infer<typeof signinSchema>;
