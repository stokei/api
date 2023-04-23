import { ICommand } from '@nestjs/cqrs';

import { ChangeInvoiceToPaymentErrorDTO } from '@/dtos/invoices/change-invoice-to-payment-error.dto';

export class ChangeInvoiceToPaymentErrorCommand
  implements ICommand, ChangeInvoiceToPaymentErrorDTO
{
  app: string;
  invoice: string;
  invoiceUrl: string;
  paymentMethod: string;
  updatedBy: string;

  constructor(data: ChangeInvoiceToPaymentErrorDTO) {
    this.app = data.app;
    this.invoice = data.invoice;
    this.invoiceUrl = data.invoiceUrl;
    this.paymentMethod = data.paymentMethod;
    this.updatedBy = data.updatedBy;
  }
}
