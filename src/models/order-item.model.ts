import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrderItemCreatedEvent } from '@/events/implements/order-items/order-item-created.event';
import { OrderItemRemovedEvent } from '@/events/implements/order-items/order-item-removed.event';
import { OrderItemUpdatedEvent } from '@/events/implements/order-items/order-item-updated.event';

export interface IOrderItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly price?: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly recurring?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class OrderItemModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly product: string;
  readonly quantity: number;
  readonly price?: string;
  readonly totalAmount: number;
  readonly subtotalAmount: number;
  readonly recurring?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IOrderItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDER_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.product = data.product;
    this.quantity = data.quantity;
    this.price = data.price;
    this.totalAmount = data.totalAmount;
    this.subtotalAmount = data.subtotalAmount;
    this.recurring = data.recurring;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdOrderItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemCreatedEvent({
          createdBy,
          orderItem: this
        })
      );
    }
  }

  updatedOrderItem({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemUpdatedEvent({
          updatedBy,
          orderItem: this
        })
      );
    }
  }

  removedOrderItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new OrderItemRemovedEvent({
          removedBy,
          orderItem: this
        })
      );
    }
  }
}
