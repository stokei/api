import { FindPaymentByIdService } from './find-payment-by-id';
import { FindAllPaymentsService } from './find-all-payments';
import { CreatePaymentService } from './create-payment';
import { RemovePaymentService } from './remove-payment';
import { UpdatePaymentService } from './update-payment';

export const PaymentServices = [
  CreatePaymentService,
  RemovePaymentService,
  UpdatePaymentService,
  FindPaymentByIdService,
  FindAllPaymentsService
];
