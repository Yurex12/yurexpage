import { PrismaClient } from "@/generated/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { username } from "better-auth/plugins";

import { signupSchemaWithoutConfirmPassword } from "./schemas/authSchemas";
import { generateUsername } from "./username";

import { createAuthMiddleware, APIError } from "better-auth/api";

const prisma = new PrismaClient();

export const auth = betterAuth({
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const MAX_TRIES = 30;

          for (let i = 0; i < MAX_TRIES; i++) {
            const candidate = generateUsername(user.name, user.email, i);

            const usernameExist = await prisma.user.findUnique({
              where: { username: candidate },
              select: { id: true },
            });

            if (!usernameExist) {
              return {
                data: {
                  ...user,
                  username: candidate.toLowerCase(),
                  displayUsername: candidate,
                },
              };
            }
          }
          throw new APIError("BAD_REQUEST", {
            message:
              "We couldn’t create a username at the moment. Please try again later.",
          });
        },
      },
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 25,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/sign-up/email") {
        const validatedFields = signupSchemaWithoutConfirmPassword.safeParse(
          ctx.body,
        );

        console.log(validatedFields);

        if (!validatedFields.success) {
          throw new APIError("BAD_REQUEST", {
            message: "Please eneter correct details",
          });
        }
      }
    }),
  },
  plugins: [username(), nextCookies()],
});
