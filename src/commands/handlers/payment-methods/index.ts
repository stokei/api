import { CreatePaymentMethodCommandHandler } from './create-payment-method';
import { RemovePaymentMethodCommandHandler } from './remove-payment-method';
import { UpdatePaymentMethodCommandHandler } from './update-payment-method';

export const PaymentMethodCommandHandlers = [
  CreatePaymentMethodCommandHandler,
  RemovePaymentMethodCommandHandler,
  UpdatePaymentMethodCommandHandler
];
