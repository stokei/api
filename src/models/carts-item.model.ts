import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CartsItemCreatedEvent } from '@/events/implements/carts-items/carts-item-created.event';
import { CartsItemRemovedEvent } from '@/events/implements/carts-items/carts-item-removed.event';
import { CartsItemUpdatedEvent } from '@/events/implements/carts-items/carts-item-updated.event';

export interface ICartsItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CartsItemModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICartsItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CARTS_ITEMS,
      module: ServerStokeiApiIdPrefix.CARTS_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
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
