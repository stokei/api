/*
  Warnings:

  - You are about to drop the column `hero` on the `apps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `apps` DROP COLUMN `hero`;

-- CreateTable
CREATE TABLE `components` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `data` VARCHAR(255) NOT NULL,
    `type` ENUM('CATALOG', 'HERO', 'HERO_WITH_IMAGE', 'HERO_WITH_VIDEO') NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sorted_lists` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `item` VARCHAR(255) NOT NULL,
    `index` INTEGER NOT NULL DEFAULT 1,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
