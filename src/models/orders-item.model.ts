import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrdersItemCreatedEvent } from '@/events/implements/orders-items/orders-item-created.event';
import { OrdersItemRemovedEvent } from '@/events/implements/orders-items/orders-item-removed.event';
import { OrdersItemUpdatedEvent } from '@/events/implements/orders-items/orders-item-updated.event';

export interface IOrdersItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class OrdersItemModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IOrdersItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS_ITEMS,
      module: ServerStokeiApiIdPrefix.ORDERS_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemCreatedEvent({
          ordersItem: this
        })
      );
    }
  }

  updatedOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemUpdatedEvent({
          ordersItem: this
        })
      );
    }
  }

  removedOrdersItem() {
    if (this.id) {
      this.apply(
        new OrdersItemRemovedEvent({
          ordersItem: this
        })
      );
    }
  }
}
