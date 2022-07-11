import { PaymentMethodCreatedHandler } from './payment-method-created.handler';
import { PaymentMethodRemovedHandler } from './payment-method-removed.handler';
import { PaymentMethodUpdatedHandler } from './payment-method-updated.handler';

export const PaymentMethodEventsHandlers = [
  PaymentMethodCreatedHandler,
  PaymentMethodUpdatedHandler,
  PaymentMethodRemovedHandler
];
