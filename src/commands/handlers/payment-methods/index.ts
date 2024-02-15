import { CreatePaymentMethodBoletoCommandHandler } from './create-payment-method-boleto';
import { CreatePaymentMethodCardCommandHandler } from './create-payment-method-card';
import { CreatePaymentMethodCardByCardHashCommandHandler } from './create-payment-method-card-by-card-hash';
import { CreatePaymentMethodPixCommandHandler } from './create-payment-method-pix';
import { CreatePaymentMethodStripeCommandHandler } from './create-payment-method-stripe';
import { RemovePaymentMethodCommandHandler } from './remove-payment-method';
import { UpdatePaymentMethodCommandHandler } from './update-payment-method';

export const PaymentMethodCommandHandlers = [
  CreatePaymentMethodCardCommandHandler,
  CreatePaymentMethodPixCommandHandler,
  CreatePaymentMethodBoletoCommandHandler,
  RemovePaymentMethodCommandHandler,
  UpdatePaymentMethodCommandHandler,
  CreatePaymentMethodCardByCardHashCommandHandler,
  CreatePaymentMethodStripeCommandHandler
];
