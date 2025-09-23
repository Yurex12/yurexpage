/*
  Warnings:

  - You are about to alter the column `username` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(15)`.

*/
-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "username" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "bio" SET DATA TYPE TEXT;
