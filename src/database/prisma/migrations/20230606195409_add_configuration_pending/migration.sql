-- AlterTable
ALTER TABLE `accounts` MODIFY `status` ENUM('ACTIVE', 'INACTIVE', 'CANCELED', 'BLOCKED', 'CONFIGURATION_PENDING') NOT NULL;
