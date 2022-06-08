import { CreatePaymentsMethodResolver } from './create-payments-method';
import { RemovePaymentsMethodResolver } from './remove-payments-method';
import { UpdatePaymentsMethodResolver } from './update-payments-method';

export const PaymentsMethodsMutations = [
  CreatePaymentsMethodResolver,
  RemovePaymentsMethodResolver,
  UpdatePaymentsMethodResolver
];
