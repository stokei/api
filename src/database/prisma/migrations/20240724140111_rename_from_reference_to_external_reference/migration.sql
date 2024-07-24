/*
  Warnings:

  - You are about to drop the column `reference` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `reference`,
    ADD COLUMN `external_reference` VARCHAR(255) NULL;
