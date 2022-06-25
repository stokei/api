import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { PaymentStatus } from '@/enums/payment-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PaymentCreatedEvent } from '@/events/implements/payments/payment-created.event';
import { PaymentRemovedEvent } from '@/events/implements/payments/payment-removed.event';
import { PaymentUpdatedEvent } from '@/events/implements/payments/payment-updated.event';

export interface IPaymentModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly order: string;
  readonly amount: number;
  readonly externalPaymentId: string;
  readonly paymentMethod: string;
  readonly status: PaymentStatus;
  readonly active: boolean;
  readonly paidAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly paymentErrorAt?: Date | string;
  readonly totalRefundedAt?: Date | string;
  readonly parcialRefundedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
}

export class PaymentModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly order: string;
  readonly amount: number;
  readonly externalPaymentId: string;
  readonly paymentMethod: string;
  readonly status: PaymentStatus;
  readonly active: boolean;
  readonly paidAt?: string;
  readonly canceledAt?: string;
  readonly paymentErrorAt?: string;
  readonly totalRefundedAt?: string;
  readonly parcialRefundedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPaymentModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAYMENTS,
      module: ServerStokeiApiIdPrefix.PAYMENTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.order = data.order;
    this.amount = data.amount;
    this.externalPaymentId = data.externalPaymentId;
    this.paymentMethod = data.paymentMethod;
    this.status = data.status;
    this.active = this.status === PaymentStatus.PAID || data.active;
    this.paidAt = convertToISODateString(data.paidAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.totalRefundedAt = convertToISODateString(data.totalRefundedAt);
    this.parcialRefundedAt = convertToISODateString(data.parcialRefundedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdPayment() {
    if (this.id) {
      this.apply(
        new PaymentCreatedEvent({
          payment: this
        })
      );
    }
  }

  updatedPayment() {
    if (this.id) {
      this.apply(
        new PaymentUpdatedEvent({
          payment: this
        })
      );
    }
  }

  removedPayment() {
    if (this.id) {
      this.apply(
        new PaymentRemovedEvent({
          payment: this
        })
      );
    }
  }
}
