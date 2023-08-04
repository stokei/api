import { CreatePaymentMethodBoletoCommandHandler } from './create-payment-method-boleto';
import { CreatePaymentMethodCardCommandHandler } from './create-payment-method-card';
import { CreatePaymentMethodPixCommandHandler } from './create-payment-method-pix';
import { RemovePaymentMethodCommandHandler } from './remove-payment-method';

export const PaymentMethodCommandHandlers = [
  CreatePaymentMethodCardCommandHandler,
  CreatePaymentMethodPixCommandHandler,
  CreatePaymentMethodBoletoCommandHandler,
  RemovePaymentMethodCommandHandler
];
