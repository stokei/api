/*
  Warnings:

  - You are about to drop the `sorted_lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `sorted_lists`;

-- CreateTable
CREATE TABLE `sorted_items` (
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
