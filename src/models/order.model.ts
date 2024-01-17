import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderChangedToPaidEvent } from '@/events/implements/orders/order-changed-to-paid.event';
import { OrderChangedToPaymentErrorEvent } from '@/events/implements/orders/order-changed-to-payment-error.event';
import { OrderChangedToPendingEvent } from '@/events/implements/orders/order-changed-to-pending.event';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

export interface IOrderModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly coupon?: string;
  readonly currency: string;
  readonly status: OrderStatus;
  readonly paidAmount: number;
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

export class OrderModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly coupon?: string;
  readonly currency: string;
  readonly status: OrderStatus;
  readonly paidAmount: number;
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
  constructor(data: IOrderModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.coupon = data.coupon;
    this.currency = data.currency;
    this.status = data.status || OrderStatus.PENDING;
    this.paidAmount = data.paidAmount;
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

  createdOrder({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new OrderCreatedEvent({
          createdBy,
          order: this
        })
      );
    }
  }

  updatedOrder({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderUpdatedEvent({
          updatedBy,
          order: this
        })
      );
    }
  }

  removedOrder({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderRemovedEvent({
          removedBy,
          order: this
        })
      );
    }
  }

  changedOrderToPaid({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderChangedToPaidEvent({
          updatedBy,
          order: this
        })
      );
    }
  }

  changedOrderToPending({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderChangedToPendingEvent({
          updatedBy,
          order: this
        })
      );
    }
  }

  changedOrderToPaymentError({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderChangedToPaymentErrorEvent({
          updatedBy,
          order: this
        })
      );
    }
  }
}
