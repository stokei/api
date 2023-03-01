-- CreateTable
CREATE TABLE "catalogs" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "subtitle" VARCHAR(255),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "catalogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "catalog_items" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "catalog" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "catalog_items_pkey" PRIMARY KEY ("id")
);
