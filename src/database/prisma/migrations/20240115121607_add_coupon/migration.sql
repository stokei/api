-- AlterTable
ALTER TABLE `orders` ADD COLUMN `coupon` VARCHAR(255) NULL;

-- CreateTable
CREATE TABLE `coupons` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `code` VARCHAR(255) NOT NULL,
    `recipient` VARCHAR(255) NULL,
    `amount_off` DOUBLE NULL,
    `percent_off` DOUBLE NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
