-- AlterTable
ALTER TABLE `payments_methods` MODIFY `payment_method_type` ENUM('CARD', 'BOLETO', 'PIX', 'STRIPE', 'MERCADOPAGO', 'PAGARME', 'PAGSEGURO') NULL DEFAULT 'CARD';
