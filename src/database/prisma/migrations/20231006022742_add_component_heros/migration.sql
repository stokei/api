-- AlterTable
ALTER TABLE `components` MODIFY `type` ENUM('HEADER', 'FOOTER', 'IMAGE', 'VIDEO', 'GRID', 'GRID_ITEM', 'SPACE', 'STACK', 'TEXT', 'TITLE', 'CARD', 'BUTTON', 'MENU', 'MENU_ITEM', 'CATALOG', 'NAVLINK', 'HERO_DEFAULT', 'HERO_WITH_VIDEO', 'HERO_WITH_IMAGE', 'HERO_WITH_IMAGE_BACKGROUND') NOT NULL;
