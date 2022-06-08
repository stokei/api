import { FindPaymentsMethodByIdService } from './find-payments-method-by-id';
import { FindAllPaymentsMethodsService } from './find-all-payments-methods';
import { CreatePaymentsMethodService } from './create-payments-method';
import { RemovePaymentsMethodService } from './remove-payments-method';
import { UpdatePaymentsMethodService } from './update-payments-method';

export const PaymentsMethodServices = [
  CreatePaymentsMethodService,
  RemovePaymentsMethodService,
  UpdatePaymentsMethodService,
  FindPaymentsMethodByIdService,
  FindAllPaymentsMethodsService
];
