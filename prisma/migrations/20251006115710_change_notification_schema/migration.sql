/*
  Warnings:

  - You are about to drop the column `triggerUserId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId,type]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Notification" DROP CONSTRAINT "Notification_triggerUserId_fkey";

-- DropIndex
DROP INDEX "public"."Notification_postId_idx";

-- DropIndex
DROP INDEX "public"."Notification_triggerUserId_idx";

-- DropIndex
DROP INDEX "public"."Notification_triggerUserId_postId_type_key";

-- AlterTable
ALTER TABLE "public"."Notification" DROP COLUMN "triggerUserId";

-- CreateTable
CREATE TABLE "public"."NotificationTrigger" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notificationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NotificationTrigger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NotificationTrigger_notificationId_idx" ON "public"."NotificationTrigger"("notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "NotificationTrigger_userId_notificationId_key" ON "public"."NotificationTrigger"("userId", "notificationId");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_postId_type_key" ON "public"."Notification"("userId", "postId", "type");

-- AddForeignKey
ALTER TABLE "public"."NotificationTrigger" ADD CONSTRAINT "NotificationTrigger_notificationId_fkey" FOREIGN KEY ("notificationId") REFERENCES "public"."Notification"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."NotificationTrigger" ADD CONSTRAINT "NotificationTrigger_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
