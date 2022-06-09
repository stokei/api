import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductsImageCreatedEvent } from '@/events/implements/products-images/products-image-created.event';
import { ProductsImageRemovedEvent } from '@/events/implements/products-images/products-image-removed.event';
import { ProductsImageUpdatedEvent } from '@/events/implements/products-images/products-image-updated.event';

export interface IProductsImageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ProductsImageModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IProductsImageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCTS_IMAGES,
      module: ServerStokeiApiIdPrefix.PRODUCTS_IMAGES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdProductsImage() {
    if (this.id) {
      this.apply(
        new ProductsImageCreatedEvent({
          productsImage: this
        })
      );
    }
  }

  updatedProductsImage() {
    if (this.id) {
      this.apply(
        new ProductsImageUpdatedEvent({
          productsImage: this
        })
      );
    }
  }

  removedProductsImage() {
    if (this.id) {
      this.apply(
        new ProductsImageRemovedEvent({
          productsImage: this
        })
      );
    }
  }
}
