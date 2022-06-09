import { FindAllPaymentsMethodsQueryHandler } from './find-all-payments-methods';
import { FindPaymentsMethodByIdQueryHandler } from './find-payments-method-by-id';

export const PaymentsMethodQueriesHandlers = [
  FindPaymentsMethodByIdQueryHandler,
  FindAllPaymentsMethodsQueryHandler
];
