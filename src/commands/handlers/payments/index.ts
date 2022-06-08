import { CreatePaymentCommandHandler } from './create-payment';
import { RemovePaymentCommandHandler } from './remove-payment';
import { UpdatePaymentCommandHandler } from './update-payment';

export const PaymentCommandHandlers = [
  CreatePaymentCommandHandler,
  RemovePaymentCommandHandler,
  UpdatePaymentCommandHandler
];
