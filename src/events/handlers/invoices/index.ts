import { InvoiceChangedToPaidHandler } from './invoice-changed-to-paid.handler';
import { InvoiceChangedToPaymentErrorHandler } from './invoice-changed-to-payment-error.handler';
import { InvoiceCreatedHandler } from './invoice-created.handler';

export const InvoiceEventsHandlers = [
  InvoiceCreatedHandler,
  InvoiceChangedToPaymentErrorHandler,
  InvoiceChangedToPaidHandler
];
