/*
  Warnings:

  - Added the required column `payer` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` ADD COLUMN `payer` VARCHAR(255) NOT NULL;
