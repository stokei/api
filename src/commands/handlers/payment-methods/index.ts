import { CreatePaymentMethodCommandHandler } from './create-payment-method';
import { RemovePaymentMethodCommandHandler } from './remove-payment-method';

export const PaymentMethodCommandHandlers = [
  CreatePaymentMethodCommandHandler,
  RemovePaymentMethodCommandHandler
];
