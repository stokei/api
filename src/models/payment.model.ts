import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentChangedToPaidEvent } from '@/events/implements/payments/payment-changed-to-paid.event';
import { PaymentChangedToPaymentErrorEvent } from '@/events/implements/payments/payment-changed-to-payment-error.event';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

export interface IPaymentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly payer: string;
  readonly currency: string;
  readonly status: PaymentStatus;
  readonly paymentMethod?: string;
  readonly stripeCheckoutSession?: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly feeAmount: number;
  readonly active: boolean;
  readonly paidAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly paymentErrorAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PaymentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly payer: string;
  readonly currency: string;
  readonly status: PaymentStatus;
  readonly paymentMethod?: string;
  readonly stripeCheckoutSession?: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly feeAmount: number;
  readonly active: boolean;
  readonly paidAt?: string;
  readonly canceledAt?: string;
  readonly paymentErrorAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IPaymentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.payer = data.payer;
    this.currency = data.currency;
    this.status = data.status;
    this.paymentMethod = data.paymentMethod;
    this.stripeCheckoutSession = data.stripeCheckoutSession;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.feeAmount = data.feeAmount;
    this.active = data.active;
    this.paidAt = convertToISODateString(data.paidAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPayment({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentCreatedEvent({
          createdBy,
          payment: this
        })
      );
    }
  }

  updatedPayment({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentUpdatedEvent({
          updatedBy,
          payment: this
        })
      );
    }
  }

  removedPayment({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentRemovedEvent({
          removedBy,
          payment: this
        })
      );
    }
  }

  changedPaymentToPaid({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentChangedToPaidEvent({
          updatedBy,
          payment: this
        })
      );
    }
  }

  changedPaymentToPaymentError({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PaymentChangedToPaymentErrorEvent({
          updatedBy,
          payment: this
        })
      );
    }
  }
}
