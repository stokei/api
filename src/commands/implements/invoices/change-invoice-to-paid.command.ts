import { ICommand } from '@nestjs/cqrs';

import { ChangeInvoiceToPaidDTO } from '@/dtos/invoices/change-invoice-to-paid.dto';

export class ChangeInvoiceToPaidCommand
  implements ICommand, ChangeInvoiceToPaidDTO
{
  app: string;
  invoice: string;
  invoiceUrl?: string;
  paymentMethod: string;
  updatedBy: string;

  constructor(data: ChangeInvoiceToPaidDTO) {
    this.app = data.app;
    this.invoice = data.invoice;
    this.invoiceUrl = data.invoiceUrl;
    this.paymentMethod = data.paymentMethod;
    this.updatedBy = data.updatedBy;
  }
}
