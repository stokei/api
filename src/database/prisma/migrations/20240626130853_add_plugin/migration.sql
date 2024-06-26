-- AlterTable
ALTER TABLE `payments` MODIFY `paymentGatewayType` ENUM('STRIPE', 'PAGARME', 'MERCADOPAGO', 'PAGSEGURO') NOT NULL DEFAULT 'STRIPE';

-- CreateTable
CREATE TABLE `plugins` (
    `id` VARCHAR(191) NOT NULL,
    `app` VARCHAR(255) NOT NULL,
    `parent` VARCHAR(255) NOT NULL,
    `type` ENUM('STRIPE', 'PAGARME', 'MERCADOPAGO', 'PAGSEGURO') NOT NULL,
    `public_key` VARCHAR(255) NOT NULL,
    `private_key` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_by` VARCHAR(255) NULL,
    `created_by` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
