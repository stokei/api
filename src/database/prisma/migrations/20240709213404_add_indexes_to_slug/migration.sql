-- CreateIndex
CREATE INDEX `apps_slug_idx` ON `apps`(`slug`);

-- CreateIndex
CREATE INDEX `components_parent_idx` ON `components`(`parent`);

-- CreateIndex
CREATE INDEX `coupons_code_idx` ON `coupons`(`code`);

-- CreateIndex
CREATE INDEX `domains_name_idx` ON `domains`(`name`);

-- CreateIndex
CREATE INDEX `pages_slug_idx` ON `pages`(`slug`);

-- CreateIndex
CREATE INDEX `plugins_type_idx` ON `plugins`(`type`);

-- CreateIndex
CREATE INDEX `sites_slug_idx` ON `sites`(`slug`);
