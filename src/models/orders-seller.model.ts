import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { OrdersSellerCreatedEvent } from '@/events/implements/orders-sellers/orders-seller-created.event';
import { OrdersSellerRemovedEvent } from '@/events/implements/orders-sellers/orders-seller-removed.event';
import { OrdersSellerUpdatedEvent } from '@/events/implements/orders-sellers/orders-seller-updated.event';

export interface IOrdersSellerModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class OrdersSellerModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IOrdersSellerModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.ORDERS_SELLERS,
      module: ServerStokeiApiIdPrefix.ORDERS_SELLERS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdOrdersSeller() {
    if (this.id) {
      this.apply(
        new OrdersSellerCreatedEvent({
          ordersSeller: this
        })
      );
    }
  }

  updatedOrdersSeller() {
    if (this.id) {
      this.apply(
        new OrdersSellerUpdatedEvent({
          ordersSeller: this
        })
      );
    }
  }

  removedOrdersSeller() {
    if (this.id) {
      this.apply(
        new OrdersSellerRemovedEvent({
          ordersSeller: this
        })
      );
    }
  }
}
