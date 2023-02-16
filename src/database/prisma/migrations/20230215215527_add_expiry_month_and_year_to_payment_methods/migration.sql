-- AlterTable
ALTER TABLE "payments_methods" ADD COLUMN     "card_expiry_month" VARCHAR(4),
ADD COLUMN     "card_expiry_year" VARCHAR(4);
