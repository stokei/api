import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CatalogItemCreatedEvent } from '@/events/implements/catalog-items/catalog-item-created.event';
import { CatalogItemRemovedEvent } from '@/events/implements/catalog-items/catalog-item-removed.event';

export interface ICatalogItemModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly catalog: string;
  readonly product: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CatalogItemModel extends AggregateRoot {
  readonly id: string;
  readonly catalog: string;
  readonly product: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICatalogItemModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CATALOG_ITEMS,
      id: data._id?.toString() || data.id
    });
    this.catalog = data.catalog;
    this.product = data.product;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCatalogItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CatalogItemCreatedEvent({
          createdBy,
          catalogItem: this
        })
      );
    }
  }

  removedCatalogItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CatalogItemRemovedEvent({
          removedBy,
          catalogItem: this
        })
      );
    }
  }
}
