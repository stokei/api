/*
  Warnings:

  - The values [HERO_DEFAULT,HERO_WITH_VIDEO,HERO_WITH_IMAGE,HERO_WITH_IMAGE_BACKGROUND] on the enum `components_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `components` MODIFY `type` ENUM('HEADER', 'FOOTER', 'IMAGE', 'VIDEO', 'GRID', 'GRID_ITEM', 'SPACE', 'STACK', 'TEXT', 'TITLE', 'CARD', 'BUTTON', 'MENU', 'MENU_ITEM', 'CATALOG', 'NAVLINK', 'HERO', 'HERO_CONTENT', 'HERO_MEDIA', 'HERO_TITLE', 'HERO_SUBTITLE') NOT NULL;
