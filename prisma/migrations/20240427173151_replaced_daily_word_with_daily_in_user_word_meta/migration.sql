/*
  Warnings:

  - You are about to drop the column `dailyWord` on the `UserWordMeta` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserWordMeta" DROP COLUMN "dailyWord",
ADD COLUMN     "daily" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;
