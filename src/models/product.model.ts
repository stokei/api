import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductCreatedEvent } from '@/events/implements/products/product-created.event';
import { ProductUpdatedEvent } from '@/events/implements/products/product-updated.event';
import { ProductRemovedEvent } from '@/events/implements/products/product-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IProductModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProductModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProductModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCTS,
      module: ServerStokeiApiIdPrefix.PRODUCTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProduct() {
    if (this.id) {
      this.apply(
        new ProductCreatedEvent({
          product: this
        })
      );
    }
  }

  updatedProduct() {
    if (this.id) {
      this.apply(
        new ProductUpdatedEvent({
          product: this
        })
      );
    }
  }

  removedProduct() {
    if (this.id) {
      this.apply(
        new ProductRemovedEvent({
          product: this
        })
      );
    }
  }
}
