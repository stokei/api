/*
  Warnings:

  - You are about to alter the column `duration` on the `files` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `files` MODIFY `duration` DOUBLE NULL;

-- AlterTable
ALTER TABLE `videos` ADD COLUMN `duration` DOUBLE NULL;
