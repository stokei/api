import { FindAllInvoicesQueryHandler } from './find-all-invoices';
import { FindInvoiceByIdQueryHandler } from './find-invoice-by-id';
import { FindInvoiceByStripeInvoiceQueryHandler } from './find-invoice-by-stripe-invoice';

export const InvoiceQueriesHandlers = [
  FindInvoiceByIdQueryHandler,
  FindAllInvoicesQueryHandler,
  FindInvoiceByStripeInvoiceQueryHandler
];
