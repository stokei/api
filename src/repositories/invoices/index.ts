import { CountInvoicesRepository } from './count-invoices';
import { CreateInvoiceRepository } from './create-invoice';
import { FindAllInvoicesRepository } from './find-all-invoices';
import { FindInvoiceByIdRepository } from './find-invoice-by-id';

export const InvoicesRepositories = [
  CountInvoicesRepository,
  CreateInvoiceRepository,
  FindInvoiceByIdRepository,
  FindAllInvoicesRepository
];
