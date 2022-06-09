import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { MetatagCreatedEvent } from '@/events/implements/metatags/metatag-created.event';
import { MetatagRemovedEvent } from '@/events/implements/metatags/metatag-removed.event';
import { MetatagUpdatedEvent } from '@/events/implements/metatags/metatag-updated.event';

export interface IMetatagModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class MetatagModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IMetatagModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.METATAGS,
      module: ServerStokeiApiIdPrefix.METATAGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdMetatag() {
    if (this.id) {
      this.apply(
        new MetatagCreatedEvent({
          metatag: this
        })
      );
    }
  }

  updatedMetatag() {
    if (this.id) {
      this.apply(
        new MetatagUpdatedEvent({
          metatag: this
        })
      );
    }
  }

  removedMetatag() {
    if (this.id) {
      this.apply(
        new MetatagRemovedEvent({
          metatag: this
        })
      );
    }
  }
}
