import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { InvoiceStatus } from '@/enums/invoice-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { InvoiceChangedToPaidEvent } from '@/events/implements/invoices/invoice-changed-to-paid.event';
import { InvoiceChangedToPaymentErrorEvent } from '@/events/implements/invoices/invoice-changed-to-payment-error.event';
import { InvoiceCreatedEvent } from '@/events/implements/invoices/invoice-created.event';

export interface IInvoiceModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly customer: string;
  readonly subscription: string;
  readonly product: string;
  readonly url?: string;
  readonly price: string;
  readonly currency: string;
  readonly paymentMethod?: string;
  readonly status: InvoiceStatus;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly active: boolean;
  readonly stripeInvoice?: string;
  readonly paidAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly paymentErrorAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class InvoiceModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly customer: string;
  readonly subscription: string;
  readonly product: string;
  readonly url?: string;
  readonly price: string;
  readonly paymentMethod?: string;
  readonly currency: string;
  readonly status: InvoiceStatus;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly active: boolean;
  readonly stripeInvoice?: string;
  readonly paidAt?: string;
  readonly canceledAt?: string;
  readonly paymentErrorAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IInvoiceModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.INVOICES,
      module: ServerStokeiApiIdPrefix.INVOICES,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.customer = data.customer;
    this.subscription = data.subscription;
    this.product = data.product;
    this.price = data.price;
    this.paymentMethod = data.paymentMethod;
    this.currency = data.currency;
    this.status = data.status;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.url = data.url;
    this.active = data.active || InvoiceModel.isActive(this.status);
    this.stripeInvoice = data.stripeInvoice;
    this.paidAt = convertToISODateString(data.paidAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  static isActive(status: InvoiceStatus) {
    return status === InvoiceStatus.PAID;
  }

  createdInvoice({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new InvoiceCreatedEvent({
          createdBy,
          invoice: this
        })
      );
    }
  }

  changedInvoiceToPaid() {
    if (this.id) {
      this.apply(
        new InvoiceChangedToPaidEvent({
          updatedBy: this.updatedBy,
          invoice: this
        })
      );
    }
  }

  changedInvoiceToPaymentError() {
    if (this.id) {
      this.apply(
        new InvoiceChangedToPaymentErrorEvent({
          updatedBy: this.updatedBy,
          invoice: this
        })
      );
    }
  }
}
