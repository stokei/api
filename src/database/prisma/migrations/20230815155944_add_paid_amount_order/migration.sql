/*
  Warnings:

  - Added the required column `paid_amount` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `paid_amount` DOUBLE NOT NULL;
