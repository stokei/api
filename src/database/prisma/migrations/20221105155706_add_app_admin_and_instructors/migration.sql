/*
  Warnings:

  - You are about to drop the column `roles` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the `courses_instructors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `courses_students` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "roles";

-- DropTable
DROP TABLE "courses_instructors";

-- DropTable
DROP TABLE "courses_students";

-- DropEnum
DROP TYPE "AccountRole";

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
