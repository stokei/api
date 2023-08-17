import { ChangePaymentToPaidCommandHandler } from './change-payment-to-paid';
import { ChangePaymentToPaymentErrorCommandHandler } from './change-payment-to-payment-error';
import { CreatePaymentCommandHandler } from './create-payment';
import { RemovePaymentCommandHandler } from './remove-payment';
import { UpdatePaymentCommandHandler } from './update-payment';

export const PaymentCommandHandlers = [
  CreatePaymentCommandHandler,
  RemovePaymentCommandHandler,
  UpdatePaymentCommandHandler,
  ChangePaymentToPaidCommandHandler,
  ChangePaymentToPaymentErrorCommandHandler
];
