import { InvoiceModel } from '@/models/invoice.model';

interface IDataInvoiceChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly invoice: InvoiceModel;
}

export class InvoiceChangedToPaymentErrorEvent {
  readonly updatedBy: string;
  readonly invoice: InvoiceModel;

  constructor(data: IDataInvoiceChangedToPaymentErrorEvent) {
    this.updatedBy = data.updatedBy;
    this.invoice = data.invoice;
  }
}
