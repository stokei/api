import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface CreateInvoiceDTO {
  app: string;
  url?: string;
  customer: string;
  subscription: string;
  paymentMethod?: string;
  currency: string;
  status: InvoiceStatus;
  totalAmount: number;
  subtotalAmount: number;
  stripeInvoice?: string;
  createdBy: string;
}
