import { InvoiceModel } from '@/models/invoice.model';

interface IDataInvoiceCreatedEvent {
  readonly createdBy: string;
  readonly invoice: InvoiceModel;
}

export class InvoiceCreatedEvent {
  readonly createdBy: string;
  readonly invoice: InvoiceModel;

  constructor(data: IDataInvoiceCreatedEvent) {
    this.createdBy = data.createdBy;
    this.invoice = data.invoice;
  }
}
