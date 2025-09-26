"use server";

import { prisma } from "../prisma";

export async function existingUser(username: string) {
  try {
    // Normalize username for consistent checking
    const normalizedUsername = username.toLowerCase().trim();

    // Validate input server-side as well
    if (
      !normalizedUsername ||
      normalizedUsername.length < 4 ||
      normalizedUsername.length > 15
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

    // Check both normalized username and display username
    // This ensures uniqueness across both fields
    const userExist = await prisma.user.findFirst({
      where: {
        OR: [
          { username: normalizedUsername },
          { displayUsername: username }, // Check original case too
        ],
      },
      select: { id: true }, // Only select ID for efficiency
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
  } catch (error) {
    console.error("Username availability check error:", error);
    return {
      success: false,
      available: false,
      message: "Unable to check username availability. Please try again.",
    };
  }
}
