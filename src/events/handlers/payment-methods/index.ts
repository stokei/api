import { PaymentMethodCreatedHandler } from './payment-method-created.handler';
import { PaymentMethodRemovedHandler } from './payment-method-removed.handler';

export const PaymentMethodEventsHandlers = [
  PaymentMethodCreatedHandler,
  PaymentMethodRemovedHandler
];