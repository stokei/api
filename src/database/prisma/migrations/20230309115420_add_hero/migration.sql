/*
  Warnings:

  - You are about to drop the column `automaticRenew` on the `subscription_contracts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `subscription_contracts` DROP COLUMN `automaticRenew`,
    ADD COLUMN `automatic_renew` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `heros` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NULL,
    `title_highlight` VARCHAR(255) NULL,
    `subtitle` VARCHAR(255) NULL,
    `image` VARCHAR(255) NULL,
    `video` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
