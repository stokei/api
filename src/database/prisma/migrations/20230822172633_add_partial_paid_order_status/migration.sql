-- AlterTable
ALTER TABLE `orders` MODIFY `status` ENUM('PAID', 'PARTIAL_PAID', 'PENDING', 'PAYMENT_ERROR', 'CANCELED') NOT NULL DEFAULT 'PENDING';
