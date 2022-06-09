import { PaymentsMethodCreatedHandler } from './payments-method-created.handler';
import { PaymentsMethodRemovedHandler } from './payments-method-removed.handler';
import { PaymentsMethodUpdatedHandler } from './payments-method-updated.handler';

export const PaymentsMethodEventsHandlers = [
  PaymentsMethodCreatedHandler,
  PaymentsMethodUpdatedHandler,
  PaymentsMethodRemovedHandler
];
