import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface ChangeInvoiceToPaidRepositoryDataDTO {
  status: InvoiceStatus;
  active: boolean;
  paidAt: string;
  paymentMethod: string;
  url: string;
  updatedBy: string;
}

export interface ChangeInvoiceToPaidRepositoryWhereDTO {
  app: string;
  invoice: string;
}

export interface ChangeInvoiceToPaidRepositoryDTO {
  data: ChangeInvoiceToPaidRepositoryDataDTO;
  where: ChangeInvoiceToPaidRepositoryWhereDTO;
}
