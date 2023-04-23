import { ChangeInvoiceToPaidService } from './change-invoice-to-paid';
import { ChangeInvoiceToPaymentErrorService } from './change-invoice-to-payment-error';
import { CreateInvoiceService } from './create-invoice';
import { FindAllInvoicesService } from './find-all-invoices';
import { FindInvoiceByIdService } from './find-invoice-by-id';
import { FindInvoiceByStripeInvoiceService } from './find-invoice-by-stripe-invoice';

export const InvoiceServices = [
  CreateInvoiceService,
  FindInvoiceByIdService,
  FindAllInvoicesService,
  ChangeInvoiceToPaidService,
  ChangeInvoiceToPaymentErrorService,
  FindInvoiceByStripeInvoiceService
];
