import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductsCategoryCreatedEvent } from '@/events/implements/products-categories/products-category-created.event';
import { ProductsCategoryRemovedEvent } from '@/events/implements/products-categories/products-category-removed.event';
import { ProductsCategoryUpdatedEvent } from '@/events/implements/products-categories/products-category-updated.event';

export interface IProductsCategoryModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProductsCategoryModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProductsCategoryModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCTS_CATEGORIES,
      module: ServerStokeiApiIdPrefix.PRODUCTS_CATEGORIES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProductsCategory() {
    if (this.id) {
      this.apply(
        new ProductsCategoryCreatedEvent({
          productsCategory: this
        })
      );
    }
  }

  updatedProductsCategory() {
    if (this.id) {
      this.apply(
        new ProductsCategoryUpdatedEvent({
          productsCategory: this
        })
      );
    }
  }

  removedProductsCategory() {
    if (this.id) {
      this.apply(
        new ProductsCategoryRemovedEvent({
          productsCategory: this
        })
      );
    }
  }
}
