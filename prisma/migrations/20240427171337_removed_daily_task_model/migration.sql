/*
  Warnings:

  - You are about to drop the `DailyTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyTask" DROP CONSTRAINT "DailyTask_wordId_fkey";

-- DropTable
DROP TABLE "DailyTask";
