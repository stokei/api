import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductCreatedEvent } from '@/events/implements/products/product-created.event';
import { ProductUpdatedEvent } from '@/events/implements/products/product-updated.event';

export interface IProductModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly defaultPrice?: string;
  readonly app: string;
  readonly stripeProduct: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly activatedAt?: Date | string;
  readonly deactivatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ProductModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly defaultPrice?: string;
  readonly stripeProduct: string;
  readonly avatar?: string;
  readonly active: boolean;
  readonly activatedAt?: string;
  readonly deactivatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IProductModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.app = data.app;
    this.stripeProduct = data.stripeProduct;
    this.defaultPrice = data.defaultPrice;
    this.avatar = data.avatar;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdProduct({
    createdBy,
    catalog
  }: {
    createdBy: string;
    catalog?: string;
  }) {
    if (this.id) {
      this.apply(
        new ProductCreatedEvent({
          createdBy,
          catalog,
          product: this
        })
      );
    }
  }

  updatedProduct({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ProductUpdatedEvent({
          updatedBy,
          product: this
        })
      );
    }
  }
}
