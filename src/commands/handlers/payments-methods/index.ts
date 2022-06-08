import { CreatePaymentsMethodCommandHandler } from './create-payments-method';
import { RemovePaymentsMethodCommandHandler } from './remove-payments-method';
import { UpdatePaymentsMethodCommandHandler } from './update-payments-method';

export const PaymentsMethodCommandHandlers = [
  CreatePaymentsMethodCommandHandler,
  RemovePaymentsMethodCommandHandler,
  UpdatePaymentsMethodCommandHandler
];
