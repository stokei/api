import { ICommand } from '@nestjs/cqrs';

import { CreateInvoiceDTO } from '@/dtos/invoices/create-invoice.dto';
import { InvoiceStatus } from '@/enums/invoice-status.enum';

export class CreateInvoiceCommand implements ICommand, CreateInvoiceDTO {
  app: string;
  customer: string;
  subscription: string;
  product: string;
  price: string;
  currency: string;
  status: InvoiceStatus;
  totalAmount: number;
  subtotalAmount: number;
  stripeInvoice?: string;
  createdBy: string;

  constructor(data: CreateInvoiceDTO) {
    this.app = data.app;
    this.customer = data.customer;
    this.subscription = data.subscription;
    this.product = data.product;
    this.price = data.price;
    this.currency = data.currency;
    this.status = data.status;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.stripeInvoice = data.stripeInvoice;
    this.createdBy = data.createdBy;
  }
}