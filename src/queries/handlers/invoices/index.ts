import { FindAllInvoicesQueryHandler } from './find-all-invoices';
import { FindInvoiceByIdQueryHandler } from './find-invoice-by-id';

export const InvoiceQueriesHandlers = [
  FindInvoiceByIdQueryHandler,
  FindAllInvoicesQueryHandler
];
