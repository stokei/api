import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface ChangeInvoiceToPaymentErrorRepositoryDataDTO {
  status: InvoiceStatus;
  active: boolean;
  paymentErrorAt: string;
  paymentMethod: string;
  url: string;
  updatedBy: string;
}

export interface ChangeInvoiceToPaymentErrorRepositoryWhereDTO {
  app: string;
  invoice: string;
}

export interface ChangeInvoiceToPaymentErrorRepositoryDTO {
  data: ChangeInvoiceToPaymentErrorRepositoryDataDTO;
  where: ChangeInvoiceToPaymentErrorRepositoryWhereDTO;
}
