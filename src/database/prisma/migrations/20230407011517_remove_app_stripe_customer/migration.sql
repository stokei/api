/*
  Warnings:

  - You are about to drop the column `stripe_customer` on the `apps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apps` DROP COLUMN `stripe_customer`;
