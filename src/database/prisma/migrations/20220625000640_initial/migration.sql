-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CANCELED', 'BLOCKED');

-- CreateEnum
CREATE TYPE "AccountRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CardBrand" AS ENUM ('MASTERCARD', 'VISA', 'ELO');

-- CreateEnum
CREATE TYPE "ThemeMode" AS ENUM ('DARK', 'LIGHT');

-- CreateEnum
CREATE TYPE "ColorType" AS ENUM ('TEXT', 'HEADING', 'PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING', 'INFO');

-- CreateEnum
CREATE TYPE "DomainStatus" AS ENUM ('ACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "PaymentsMethodProvider" AS ENUM ('STRIPE');

-- CreateEnum
CREATE TYPE "PaymentsMethodType" AS ENUM ('CREDIT_CARD', 'BOLETO');

-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('FREE', 'BASIC', 'ADVANCED', 'CUSTOM');

-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'PENDING', 'CANCELED', 'FINISHED');

-- CreateEnum
CREATE TYPE "RecurringType" AS ENUM ('HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR');

-- CreateEnum
CREATE TYPE "PriceType" AS ENUM ('RECURRING', 'ONE_TIME');

-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'BLOCKED');

-- CreateEnum
CREATE TYPE "ProjectMemberRole" AS ENUM ('OWNER', 'ADMIN');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PAID', 'PENDING', 'CANCELED', 'PAYMENT_ERROR', 'TOTAL_REFUNDED', 'PARCIAL_REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PAID', 'PENDING', 'CANCELED', 'PAYMENT_ERROR', 'TOTAL_REFUNDED', 'PARCIAL_REFUNDED');

-- CreateEnum
CREATE TYPE "ClassroomsEnrollmentStatus" AS ENUM ('ACTIVE', 'FINISHED', 'CANCELED');

-- CreateEnum
CREATE TYPE "PhoneStatus" AS ENUM ('ACTIVE', 'PENDING', 'INVALID');

-- CreateEnum
CREATE TYPE "VideoStatus" AS ENUM ('ACTIVE', 'PENDING');

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "last_password" VARCHAR(255),
    "salt" VARCHAR(255) NOT NULL,
    "avatar" VARCHAR(255),
    "forgot_password_code" VARCHAR(255),
    "date_birthday" TIMESTAMP(3),
    "status" "AccountStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "roles" "AccountRole"[],
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accesses" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "expires_in" TIMESTAMP(3) NOT NULL,
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accesses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "ProjectStatus" NOT NULL,
    "avatar" VARCHAR(255),
    "plan" VARCHAR(255),
    "currency" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "blocked_at" TIMESTAMP(3),
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects_members" (
    "id" TEXT NOT NULL,
    "project" VARCHAR(255) NOT NULL,
    "member" VARCHAR(255) NOT NULL,
    "roles" "ProjectMemberRole"[],
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "projects_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sites" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "favicon" VARCHAR(255),
    "logo" VARCHAR(255),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "domains" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "fulldomain" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "extension" VARCHAR(50) NOT NULL,
    "language" VARCHAR(255) NOT NULL,
    "status" "DomainStatus" NOT NULL,
    "activated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

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

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "theme_mode" "ThemeMode" NOT NULL,
    "type" "ColorType" NOT NULL,
    "color" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "project" VARCHAR(255) NOT NULL,
    "external_product_id" VARCHAR(255) NOT NULL,
    "checkout_visible" BOOLEAN NOT NULL,
    "avatar" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "amount" INTEGER NOT NULL,
    "from_amount" INTEGER,
    "to_amount" INTEGER NOT NULL,
    "payment_method" VARCHAR(255) NOT NULL,
    "installments" INTEGER NOT NULL,
    "type" "PriceType" NOT NULL,
    "recurring_interval_count" INTEGER NOT NULL,
    "recurring_interval_type" "RecurringType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "project" VARCHAR(255) NOT NULL,
    "cart" VARCHAR(255) NOT NULL,
    "customer" VARCHAR(255) NOT NULL,
    "sales_comission_percentage" VARCHAR(255) NOT NULL,
    "sales_comission_amount" VARCHAR(255) NOT NULL,
    "currency" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "discount_amount" INTEGER NOT NULL,
    "subtotal_amount" INTEGER NOT NULL,
    "total_amount" INTEGER NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),
    "payment_error_at" TIMESTAMP(3),
    "total_refunded_at" TIMESTAMP(3),
    "parcial_refunded_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders_items" (
    "id" TEXT NOT NULL,
    "order" VARCHAR(255) NOT NULL,
    "product" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "amount" INTEGER NOT NULL,
    "from_amount" INTEGER,
    "to_amount" INTEGER NOT NULL,
    "avatar" VARCHAR(255),
    "quantity" INTEGER NOT NULL,
    "type" "PriceType" NOT NULL,
    "recurring_interval_count" VARCHAR(255) NOT NULL,
    "recurring_interval_type" "RecurringType" NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "order" VARCHAR(255) NOT NULL,
    "amount" INTEGER NOT NULL,
    "externalPaymentId" VARCHAR(255) NOT NULL,
    "paymentMethod" VARCHAR(255) NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),
    "payment_error_at" TIMESTAMP(3),
    "total_refunded_at" TIMESTAMP(3),
    "parcial_refunded_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments_methods" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "type" "PaymentsMethodType" NOT NULL,
    "provider" "PaymentsMethodProvider" NOT NULL,
    "external_payment_method_id" VARCHAR(255) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "activated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deactivated_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "external_card_id" VARCHAR(255) NOT NULL,
    "last_four_number" VARCHAR(4) NOT NULL,
    "brand" "CardBrand" NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts_items" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255) NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carts_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "type" "PlanType" NOT NULL,
    "checkout_visible" BOOLEAN NOT NULL DEFAULT false,
    "status" "PlanStatus" NOT NULL,
    "recurring_interval" INTEGER NOT NULL,
    "recurring_type" "RecurringType" NOT NULL,
    "has_custom_domain" BOOLEAN NOT NULL DEFAULT false,
    "has_custom_site" BOOLEAN NOT NULL DEFAULT false,
    "quantity_courses" INTEGER NOT NULL,
    "quantity_instructor_per_courses" INTEGER NOT NULL,
    "quantity_classrooms_per_courses" INTEGER NOT NULL,
    "quantity_modules_per_classrooms" INTEGER NOT NULL,
    "quantity_videos_per_modules" INTEGER NOT NULL,
    "sales_commission_percentage" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "canceled_at" TIMESTAMP(3),
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "send_renew_email_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" TEXT NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "poster" VARCHAR(255),
    "duration" INTEGER,
    "status" "VideoStatus" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "videos_authors" (
    "id" TEXT NOT NULL,
    "video" VARCHAR(255) NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "videos_authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules_videos" (
    "id" TEXT NOT NULL,
    "module" VARCHAR(255) NOT NULL,
    "video" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modules_videos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "avatar" VARCHAR(255),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "canceled_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_instructors" (
    "id" TEXT NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "instructor" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses_students" (
    "id" TEXT NOT NULL,
    "course" VARCHAR(255) NOT NULL,
    "student" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "courses_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "has_access_to_all_modules" BOOLEAN NOT NULL DEFAULT true,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms_students" (
    "id" TEXT NOT NULL,
    "classroom" VARCHAR(255) NOT NULL,
    "student" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms_enrollments" (
    "id" TEXT NOT NULL,
    "classroom" VARCHAR(255) NOT NULL,
    "student" VARCHAR(255) NOT NULL,
    "status" "ClassroomsEnrollmentStatus" NOT NULL,
    "start_at" TIMESTAMP(3),
    "end_at" TIMESTAMP(3),
    "canceled_at" TIMESTAMP(3),
    "active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms_instructors" (
    "id" TEXT NOT NULL,
    "classroom" VARCHAR(255) NOT NULL,
    "instructor" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classrooms_modules" (
    "id" TEXT NOT NULL,
    "classroom" VARCHAR(255) NOT NULL,
    "module" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classrooms_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "parent" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "street" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255) NOT NULL,
    "number" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "postal_code" VARCHAR(255) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
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

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_username_key" ON "accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_salt_key" ON "accounts"("salt");
