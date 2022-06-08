import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductsTagCreatedEvent } from '@/events/implements/products-tags/products-tag-created.event';
import { ProductsTagUpdatedEvent } from '@/events/implements/products-tags/products-tag-updated.event';
import { ProductsTagRemovedEvent } from '@/events/implements/products-tags/products-tag-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IProductsTagModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProductsTagModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProductsTagModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCTS_TAGS,
      module: ServerStokeiApiIdPrefix.PRODUCTS_TAGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProductsTag() {
    if (this.id) {
      this.apply(
        new ProductsTagCreatedEvent({
          productsTag: this
        })
      );
    }
  }

  updatedProductsTag() {
    if (this.id) {
      this.apply(
        new ProductsTagUpdatedEvent({
          productsTag: this
        })
      );
    }
  }

  removedProductsTag() {
    if (this.id) {
      this.apply(
        new ProductsTagRemovedEvent({
          productsTag: this
        })
      );
    }
  }
}
