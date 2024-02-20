-- AlterTable
ALTER TABLE `payments_methods` MODIFY `payment_method_type` ENUM('CARD', 'BOLETO', 'PIX', 'STRIPE') NULL DEFAULT 'CARD';
