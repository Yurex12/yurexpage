/*
  Warnings:

  - You are about to drop the column `content` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[triggerUserId,postId,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Notification" DROP COLUMN "content",
ADD COLUMN     "postId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Notification_postId_idx" ON "public"."Notification"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_triggerUserId_postId_type_key" ON "public"."Notification"("triggerUserId", "postId", "type");

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
