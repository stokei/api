-- AlterTable
ALTER TABLE `components` MODIFY `type` ENUM('HEADER', 'FOOTER', 'IMAGE', 'VIDEO', 'GRID', 'TEXT', 'TITLE', 'CARD', 'BUTTON', 'MENU', 'MENU_ITEM', 'CATALOG', 'FEATURE', 'NAVLINK', 'HERO_DEFAULT', 'HERO_WITH_VIDEO', 'HERO_WITH_IMAGE', 'HERO_WITH_IMAGE_BACKGROUND') NOT NULL;
