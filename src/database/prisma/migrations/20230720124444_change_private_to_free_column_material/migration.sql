/*
  Warnings:

  - You are about to drop the column `private` on the `materials` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `materials` DROP COLUMN `private`,
    ADD COLUMN `free` BOOLEAN NULL DEFAULT true;
