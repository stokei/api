import { PaymentsMethodCreatedHandler } from './payments-method-created.handler';
import { PaymentsMethodUpdatedHandler } from './payments-method-updated.handler';
import { PaymentsMethodRemovedHandler } from './payments-method-removed.handler';

export const PaymentsMethodEventsHandlers = [
  PaymentsMethodCreatedHandler,
  PaymentsMethodUpdatedHandler,
  PaymentsMethodRemovedHandler
];
