-- AlterTable
ALTER TABLE `components` MODIFY `type` ENUM('HEADER', 'FOOTER', 'BLOCK', 'IMAGE', 'VIDEO', 'GRID', 'GRID_ITEM', 'SPACE', 'STACK', 'TEXT', 'TITLE', 'CARD', 'CARD_BODY', 'CARD_HEADER', 'CARD_FOOTER', 'BUTTON', 'MENU', 'MENU_ITEM', 'CATALOG', 'NAVBAR', 'NAVLINK', 'HERO', 'HERO_CONTENT', 'HERO_MEDIA') NOT NULL;