-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `currency` VARCHAR(255) NOT NULL,
    `status` ENUM('PAID', 'PENDING', 'PAYMENT_ERROR', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `payment_method` VARCHAR(255) NULL,
    `stripe_checkout_session` VARCHAR(255) NULL,
    `total_amount` DOUBLE NOT NULL,
    `subtotal_amount` DOUBLE NOT NULL,
    `fee_amount` DOUBLE NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `createdBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `currency` VARCHAR(255) NOT NULL,
    `status` ENUM('PAID', 'PENDING', 'PAYMENT_ERROR', 'CANCELED') NOT NULL DEFAULT 'PENDING',
    `total_amount` DOUBLE NOT NULL,
    `subtotal_amount` DOUBLE NOT NULL,
    `fee_amount` DOUBLE NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `createdBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `product` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` VARCHAR(255) NULL,
    `total_amount` DOUBLE NOT NULL,
    `subtotal_amount` DOUBLE NOT NULL,
    `recurring` VARCHAR(191) NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
