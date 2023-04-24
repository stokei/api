/*
  Warnings:

  - The values [COURSE] on the enum `plans_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `plans` MODIFY `type` ENUM('DOMAIN', 'ADMIN', 'INSTRUCTOR', 'STORAGE', 'VIDEO') NOT NULL;
