-- AlterTable
ALTER TABLE `accounts` ADD COLUMN `pagarme_customer` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `apps` ADD COLUMN `pagarme_account` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `invoices` ADD COLUMN `payment_provider` ENUM('STRIPE', 'PAGARME') NULL DEFAULT 'STRIPE';
