import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CartsItemCreatedEvent } from '@/events/implements/carts-items/carts-item-created.event';
import { CartsItemRemovedEvent } from '@/events/implements/carts-items/carts-item-removed.event';
import { CartsItemUpdatedEvent } from '@/events/implements/carts-items/carts-item-updated.event';

export interface ICartsItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly price: string;
  readonly quantity: number;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CartsItemModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly price: string;
  readonly quantity: number;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICartsItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CARTS_ITEMS,
      module: ServerStokeiApiIdPrefix.CARTS_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.price = data.price;
    this.quantity = data.quantity;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCartsItem() {
    if (this.id) {
      this.apply(
        new CartsItemCreatedEvent({
          cartsItem: this
        })
      );
    }
  }

  updatedCartsItem() {
    if (this.id) {
      this.apply(
        new CartsItemUpdatedEvent({
          cartsItem: this
        })
      );
    }
  }

  removedCartsItem() {
    if (this.id) {
      this.apply(
        new CartsItemRemovedEvent({
          cartsItem: this
        })
      );
    }
  }
}
