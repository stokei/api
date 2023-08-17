-- AlterTable
ALTER TABLE `orders` ADD COLUMN `canceled_at` DATETIME(3) NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    ADD COLUMN `payment_error_at` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `canceled_at` DATETIME(3) NULL,
    ADD COLUMN `paid_at` DATETIME(3) NULL,
    ADD COLUMN `payment_error_at` DATETIME(3) NULL;
