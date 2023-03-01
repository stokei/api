import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CatalogCreatedEvent } from '@/events/implements/catalogs/catalog-created.event';
import { CatalogRemovedEvent } from '@/events/implements/catalogs/catalog-removed.event';
import { CatalogUpdatedEvent } from '@/events/implements/catalogs/catalog-updated.event';

export interface ICatalogModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class CatalogModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly title: string;
  readonly subtitle?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ICatalogModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CATALOG,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdCatalog({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new CatalogCreatedEvent({
          createdBy,
          catalog: this
        })
      );
    }
  }

  updatedCatalog({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new CatalogUpdatedEvent({
          updatedBy,
          catalog: this
        })
      );
    }
  }

  removedCatalog({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new CatalogRemovedEvent({
          removedBy,
          catalog: this
        })
      );
    }
  }
}
