import { InvoiceStatus } from '@/enums/invoice-status.enum';

export interface CreateInvoiceDTO {
  app: string;
  customer: string;
  subscription: string;
  product: string;
  price: string;
  paymentMethod?: string;
  currency: string;
  status: InvoiceStatus;
  totalAmount: number;
  subtotalAmount: number;
  stripeInvoice?: string;
  createdBy: string;
}
