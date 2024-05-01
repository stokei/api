-- AlterTable
ALTER TABLE `components` MODIFY `type` ENUM('HEADER', 'FOOTER', 'IMAGE', 'VIDEO', 'GRID', 'GRID_ITEM', 'SPACE', 'STACK', 'TEXT', 'TITLE', 'CARD', 'BUTTON', 'MENU', 'MENU_ITEM', 'CATALOG', 'NAVBAR', 'NAVLINK', 'HERO', 'HERO_CONTENT', 'HERO_MEDIA') NOT NULL;
