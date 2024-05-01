-- AlterTable
ALTER TABLE `pages` ADD COLUMN `draftVersion` VARCHAR(255) NULL,
    ADD COLUMN `version` VARCHAR(255) NULL;
