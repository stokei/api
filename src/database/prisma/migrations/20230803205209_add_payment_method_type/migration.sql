/*
  Warnings:

  - You are about to drop the column `payment_provider` on the `invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `invoices` DROP COLUMN `payment_provider`;

-- AlterTable
ALTER TABLE `payments_methods` ADD COLUMN `payment_method_type` ENUM('CARD', 'BOLETO', 'PIX') NULL DEFAULT 'CARD',
    MODIFY `parent` VARCHAR(255) NULL,
    MODIFY `stripe_payment_method` VARCHAR(255) NULL;
