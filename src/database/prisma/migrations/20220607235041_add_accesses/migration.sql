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
