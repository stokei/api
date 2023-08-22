-- AlterTable
ALTER TABLE `payments` ADD COLUMN `paymentGatewayType` ENUM('STRIPE', 'PAGARME') NOT NULL DEFAULT 'STRIPE';
