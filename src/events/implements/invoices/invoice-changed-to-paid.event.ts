import { InvoiceModel } from '@/models/invoice.model';

interface IDataInvoiceChangedToPaidEvent {
  readonly updatedBy: string;
  readonly invoice: InvoiceModel;
}

export class InvoiceChangedToPaidEvent {
  readonly updatedBy: string;
  readonly invoice: InvoiceModel;

  constructor(data: IDataInvoiceChangedToPaidEvent) {
    this.updatedBy = data.updatedBy;
    this.invoice = data.invoice;
  }
}
