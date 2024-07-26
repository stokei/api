import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ProductComboItemCreatedEvent } from '@/events/implements/product-combo-items/product-combo-item-created.event';
import { ProductComboItemRemovedEvent } from '@/events/implements/product-combo-items/product-combo-item-removed.event';

export interface IProductComboItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly product: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ProductComboItemModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly product: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IProductComboItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PRODUCT_COMBO_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.product = data.product;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdProductComboItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ProductComboItemCreatedEvent({
          createdBy,
          productComboItem: this
        })
      );
    }
  }

  removedProductComboItem({
    removedBy,
    isLastProductComboItem
  }: {
    removedBy: string;
    isLastProductComboItem: boolean;
  }) {
    if (this.id) {
      this.apply(
        new ProductComboItemRemovedEvent({
          removedBy,
          isLastProductComboItem,
          productComboItem: this
        })
      );
    }
  }
}
