import { ChangeInvoiceToPaidRepository } from './change-invoice-to-paid';
import { ChangeInvoiceToPaymentErrorRepository } from './change-invoice-to-payment-error';
import { CountInvoicesRepository } from './count-invoices';
import { CreateInvoiceRepository } from './create-invoice';
import { FindAllInvoicesRepository } from './find-all-invoices';
import { FindInvoiceByIdRepository } from './find-invoice-by-id';

export const InvoicesRepositories = [
  ChangeInvoiceToPaidRepository,
  ChangeInvoiceToPaymentErrorRepository,
  CountInvoicesRepository,
  CreateInvoiceRepository,
  FindInvoiceByIdRepository,
  FindAllInvoicesRepository
];
