-- AlterTable
ALTER TABLE `orders` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `payments` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT false;
