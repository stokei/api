import { CountPaymentsRepository } from './count-payments';
import { CreatePaymentRepository } from './create-payment';
import { ExistsPaymentsRepository } from './exists-payments';
import { FindAllPaymentsRepository } from './find-all-payments';
import { FindPaymentByIdRepository } from './find-payment-by-id';
import { RemovePaymentRepository } from './remove-payment';
import { UpdatePaymentRepository } from './update-payment';

export const PaymentsRepositories = [
  CountPaymentsRepository,
  CreatePaymentRepository,
  ExistsPaymentsRepository,
  FindPaymentByIdRepository,
  FindAllPaymentsRepository,
  RemovePaymentRepository,
  UpdatePaymentRepository
];
