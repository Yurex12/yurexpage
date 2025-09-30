"use server";

import { MAX_USERNAME_LENGTH, MIN_USERNAME_LENGTH } from "@/constants";
import { prisma } from "../prisma";

export async function existingUser(username: string) {
  try {
    const normalizedUsername = username.toLowerCase().trim();

    if (
      !normalizedUsername ||
      normalizedUsername.length < MIN_USERNAME_LENGTH ||
      normalizedUsername.length > MAX_USERNAME_LENGTH
    ) {
      return {
        success: false,
        available: false,
        message: "Invalid username format",
      };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(normalizedUsername)) {
      return {
        success: false,
        available: false,
        message: "Username can only contain letters, numbers, and underscores",
      };
    }

    const userExist = await prisma.user.findFirst({
      where: {
        OR: [{ username: normalizedUsername }, { displayUsername: username }],
      },
      select: { id: true },
    });

    if (userExist) {
      return {
        success: false,
        available: false,
        message: `"${username}" is already taken`,
      };
    }

    return {
      success: true,
      available: true,
      message: `"${username}" is available!`,
    };
  } catch {
    return {
      success: false,
      available: false,
      message: "Unable to check username availability. Please try again.",
    };
  }
}
