import { CountPaymentsMethodsRepository } from './count-payments-methods';
import { CreatePaymentsMethodRepository } from './create-payments-method';
import { ExistsPaymentsMethodsRepository } from './exists-payments-methods';
import { FindPaymentsMethodByIdRepository } from './find-payments-method-by-id';
import { FindAllPaymentsMethodsRepository } from './find-all-payments-methods';
import { RemovePaymentsMethodRepository } from './remove-payments-method';
import { UpdatePaymentsMethodRepository } from './update-payments-method';

export const PaymentsMethodsRepositories = [
  CountPaymentsMethodsRepository,
  CreatePaymentsMethodRepository,
  ExistsPaymentsMethodsRepository,
  FindPaymentsMethodByIdRepository,
  FindAllPaymentsMethodsRepository,
  RemovePaymentsMethodRepository,
  UpdatePaymentsMethodRepository
];
