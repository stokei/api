-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('DOMAIN', 'ADMIN', 'INSTRUCTOR', 'COURSE', 'STORAGE');

-- CreateEnum
CREATE TYPE "ThemeMode" AS ENUM ('DARK', 'LIGHT');

-- CreateEnum
CREATE TYPE "ColorType" AS ENUM ('TEXT', 'HEADING', 'PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING', 'INFO');

-- CreateEnum
CREATE TYPE "DomainStatus" AS ENUM ('ACTIVE', 'PENDING', 'ERROR');

-- CreateEnum
CREATE TYPE "IntervalType" AS ENUM ('DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "UsageType" AS ENUM ('LICENSED', 'METERED');

-- CreateEnum
CREATE TYPE "UsageRecordAction" AS ENUM ('SET', 'INCREMENT');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('RECURRING', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "BillingScheme" AS ENUM ('PER_UNIT', 'TIERED');

-- CreateEnum
CREATE TYPE "TiersMode" AS ENUM ('VOLUME');

-- CreateEnum
CREATE TYPE "SubscriptionContractType" AS ENUM ('RECURRING', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "InventoryType" AS ENUM ('INFINITE', 'FINITE');

-- CreateEnum
CREATE TYPE "AppStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PAID', 'PENDING', 'PAYMENT_ERROR', 'CANCELED');

-- CreateEnum
CREATE TYPE "SubscriptionContractStatus" AS ENUM ('ACTIVE', 'PENDING', 'CANCELED');

-- CreateEnum
CREATE TYPE "PhoneStatus" AS ENUM ('ACTIVE', 'PENDING', 'INVALID');

-- CreateEnum
CREATE TYPE "FileStatus" AS ENUM ('ACTIVE', 'ENCODING', 'ERROR', 'PENDING');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "last_password" VARCHAR(255),
    "salt" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "forgot_password_code" VARCHAR(255),
    "stripe_customer" VARCHAR(255),
    "date_birthday" TIMESTAMP(3),
    "status" "AccountStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesses" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apps" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "AppStatus" NOT NULL,
    "avatar" VARCHAR(255),
    "currency" VARCHAR(255) NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255),
    "logo" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "stripe_bank_account" VARCHAR(255),
    "stripe_customer" VARCHAR(255),
    "stripe_account" VARCHAR(255),
    "payment_method" VARCHAR(255),
    "blocked_at" TIMESTAMP(3),
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "apps_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_admins" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "admin" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "app_admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_instructors" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "instructor" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "app_instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "name" VARCHAR(255) NOT NULL,
    "status" "DomainStatus" NOT NULL,
    "activated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "domains_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currencies" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "minor_unit" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "currencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "theme_mode" "ThemeMode" NOT NULL,
    "type" "ColorType" NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "stripe_product" VARCHAR(255) NOT NULL,
    "checkout_visible" BOOLEAN NOT NULL DEFAULT true,
    "avatar" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usage_records" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "action" "UsageRecordAction" NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "usage_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recurrings" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "usage_type" "UsageType" NOT NULL,
    "interval_count" INTEGER NOT NULL,
    "interval" "IntervalType" NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "recurrings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "currency" VARCHAR(255) NOT NULL,
    "stripe_price" TEXT,
    "from_amount" INTEGER,
    "amount" INTEGER,
    "type" "PriceType" NOT NULL,
    "billing_scheme" "BillingScheme" NOT NULL,
    "tiers_mode" "TiersMode" NOT NULL,
    "recurring" TEXT,
    "inventory_type" "InventoryType" NOT NULL,
    "quantity" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "price_tiers" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "upTo" INTEGER,
    "infinite" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "price_tiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_methods" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "stripe_payment_method" VARCHAR(255) NOT NULL,
    "last_four_card_number" VARCHAR(4),
    "card_brand" VARCHAR(50),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "payments_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "type" "PlanType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "features" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "features_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "filename" VARCHAR(255),
    "extension" VARCHAR(255),
    "mimetype" VARCHAR(255),
    "size" INTEGER,
    "url" VARCHAR(255),
    "duration" INTEGER,
    "status" "FileStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "file" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255),
    "file" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "poster" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos_authors" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "video" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "videos_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "avatar" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_instructors" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "instructor" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "course_instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_students" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "student" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "course_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "customer" VARCHAR(255) NOT NULL,
    "subscription" VARCHAR(255) NOT NULL,
    "url" VARCHAR(255),
    "payment_method" VARCHAR(255),
    "currency" VARCHAR(255) NOT NULL,
    "status" "InvoiceStatus" NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "subtotal_amount" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),
    "payment_error_at" TIMESTAMP(3),
    "stripe_invoice" TEXT,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "createdBy" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_contracts" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "payment_method" VARCHAR(255),
    "stripe_subscription" VARCHAR(255),
    "status" "SubscriptionContractStatus" NOT NULL,
    "type" "SubscriptionContractType" NOT NULL,
    "automaticRenew" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "subscription_contracts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subscription_contract_items" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "stripe_subscription_item" VARCHAR(255),
    "recurring" TEXT,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "subscription_contract_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "street" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "number" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "app" VARCHAR(255) NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "fullnumber" VARCHAR(255) NOT NULL,
    "country_code" VARCHAR(255) NOT NULL,
    "area_code" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "validation_code" VARCHAR(255) NOT NULL,
    "status" "PhoneStatus" NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "activated_at" TIMESTAMP(3),
    "validated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_by" VARCHAR(255),
    "created_by" VARCHAR(255),

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_username_key" ON "accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_salt_key" ON "accounts"("salt");
