-- CreateTable
CREATE TABLE `product_combo_items` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `product` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
