import { CreateInvoiceService } from './create-invoice';
import { FindAllInvoicesService } from './find-all-invoices';
import { FindInvoiceByIdService } from './find-invoice-by-id';

export const InvoiceServices = [
  CreateInvoiceService,
  FindInvoiceByIdService,
  FindAllInvoicesService
];