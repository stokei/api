import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { OrderStatus } from '@/enums/order-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderCreatedEvent } from '@/events/implements/orders/order-created.event';
import { OrderRemovedEvent } from '@/events/implements/orders/order-removed.event';
import { OrderUpdatedEvent } from '@/events/implements/orders/order-updated.event';

export interface IOrderModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly project: string;
  readonly cart: string;
  readonly customer: string;
  readonly salesComissionPercentage: number;
  readonly salesComissionAmount: number;
  readonly currency: string;
  readonly amount: number;
  readonly discountAmount: number;
  readonly subtotalAmount: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly oldStatus?: OrderStatus;
  readonly active: boolean;
  readonly paidAt?: Date | string;
  readonly canceledAt?: Date | string;
  readonly paymentErrorAt?: Date | string;
  readonly totalRefundedAt?: Date | string;
  readonly parcialRefundedAt?: Date | string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class OrderModel extends AggregateRoot {
  readonly id: string;
  readonly project: string;
  readonly cart: string;
  readonly customer: string;
  readonly salesComissionPercentage: number;
  readonly salesComissionAmount: number;
  readonly currency: string;
  readonly amount: number;
  readonly discountAmount: number;
  readonly subtotalAmount: number;
  readonly totalAmount: number;
  readonly status: OrderStatus;
  readonly oldStatus?: OrderStatus;
  readonly active: boolean;
  readonly paidAt?: string;
  readonly canceledAt?: string;
  readonly paymentErrorAt?: string;
  readonly totalRefundedAt?: string;
  readonly parcialRefundedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IOrderModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS,
      module: ServerStokeiApiIdPrefix.ORDERS,
      id: data._id?.toString() || data.id
    });
    this.project = data.project;
    this.cart = data.cart;
    this.customer = data.customer;
    this.salesComissionPercentage = data.salesComissionPercentage;
    this.salesComissionAmount = data.salesComissionAmount;
    this.currency = data.currency;
    this.amount = data.amount;
    this.discountAmount = data.discountAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.totalAmount = data.totalAmount;
    this.status = data.status;
    this.oldStatus = data.oldStatus;
    this.active = this.status === OrderStatus.PAID || data.active;
    this.paidAt = convertToISODateString(data.paidAt);
    this.canceledAt = convertToISODateString(data.canceledAt);
    this.paymentErrorAt = convertToISODateString(data.paymentErrorAt);
    this.totalRefundedAt = convertToISODateString(data.totalRefundedAt);
    this.parcialRefundedAt = convertToISODateString(data.parcialRefundedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
}
