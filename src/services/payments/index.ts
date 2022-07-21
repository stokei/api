import { CreatePaymentService } from './create-payment';
import { FindAllPaymentsService } from './find-all-payments';
import { FindPaymentByIdService } from './find-payment-by-id';

export const PaymentServices = [
  CreatePaymentService,
  FindPaymentByIdService,
  FindAllPaymentsService
];
