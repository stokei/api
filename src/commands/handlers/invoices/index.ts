import { ChangeInvoiceToPaidCommandHandler } from './change-invoice-to-paid';
import { ChangeInvoiceToPaymentErrorCommandHandler } from './change-invoice-to-payment-error';
import { CreateInvoiceCommandHandler } from './create-invoice';

export const InvoiceCommandHandlers = [
  CreateInvoiceCommandHandler,
  ChangeInvoiceToPaidCommandHandler,
  ChangeInvoiceToPaymentErrorCommandHandler
];
