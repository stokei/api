import { CountPaymentsRepository } from './count-payments';
import { CreatePaymentRepository } from './create-payment';
import { ExistsPaymentsRepository } from './exists-payments';
import { FindAllPaymentsRepository } from './find-all-payments';
import { FindPaymentByIdRepository } from './find-payment-by-id';

export const PaymentsRepositories = [
  CountPaymentsRepository,
  CreatePaymentRepository,
  ExistsPaymentsRepository,
  FindPaymentByIdRepository,
  FindAllPaymentsRepository
];
