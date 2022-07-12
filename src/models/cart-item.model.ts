import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CartItemCreatedEvent } from '@/events/implements/cart-items/cart-item-created.event';
import { CartItemRemovedEvent } from '@/events/implements/cart-items/cart-item-removed.event';
import { CartItemUpdatedEvent } from '@/events/implements/cart-items/cart-item-updated.event';

export interface ICartItemModelData {
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

export class CartItemModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly price: string;
  readonly quantity: number;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICartItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CART_ITEMS,
      module: ServerStokeiApiIdPrefix.CART_ITEMS,
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

  createdCartItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CartItemCreatedEvent({
          createdBy,
          cartItem: this
        })
      );
    }
  }

  updatedCartItem({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new CartItemUpdatedEvent({
          updatedBy,
          cartItem: this
        })
      );
    }
  }

  removedCartItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CartItemRemovedEvent({
          removedBy,
          cartItem: this
        })
      );
    }
  }
}
