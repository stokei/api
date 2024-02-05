-- AlterTable
ALTER TABLE `payments_methods` ADD COLUMN `boleto_barcode` VARCHAR(255) NULL,
    ADD COLUMN `boleto_line` VARCHAR(255) NULL,
    ADD COLUMN `boleto_url` VARCHAR(255) NULL;
