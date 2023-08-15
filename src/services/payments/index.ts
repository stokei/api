import { CreatePaymentService } from './create-payment';
import { FindAllPaymentsService } from './find-all-payments';
import { FindPaymentByIdService } from './find-payment-by-id';
import { RemovePaymentService } from './remove-payment';
import { UpdatePaymentService } from './update-payment';

export const PaymentServices = [
  CreatePaymentService,
  RemovePaymentService,
  UpdatePaymentService,
  FindPaymentByIdService,
  FindAllPaymentsService
];
