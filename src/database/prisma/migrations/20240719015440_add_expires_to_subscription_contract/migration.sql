-- AlterTable
ALTER TABLE `subscription_contracts` MODIFY `status` ENUM('ACTIVE', 'PENDING', 'CANCELED', 'EXPIRED') NOT NULL;
