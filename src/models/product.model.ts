import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductCreatedEvent } from '@/events/implements/products/product-created.event';
import { ProductRemovedEvent } from '@/events/implements/products/product-removed.event';
import { ProductUpdatedEvent } from '@/events/implements/products/product-updated.event';

export interface IProductModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly project: string;
  readonly externalProductId: string;
  readonly checkoutVisible: boolean;
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
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly project: string;
  readonly externalProductId: string;
  readonly checkoutVisible: boolean;
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
      module: ServerStokeiApiIdPrefix.PRODUCTS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.project = data.project;
    this.externalProductId = data.externalProductId;
    this.checkoutVisible = data.checkoutVisible;
    this.avatar = data.avatar;
    this.active = data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.deactivatedAt = convertToISODateString(data.deactivatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
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
