import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SitesLightColorCreatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-created.event';
import { SitesLightColorRemovedEvent } from '@/events/implements/sites-light-colors/sites-light-color-removed.event';
import { SitesLightColorUpdatedEvent } from '@/events/implements/sites-light-colors/sites-light-color-updated.event';

export interface ISitesLightColorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class SitesLightColorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ISitesLightColorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SITES_LIGHT_COLORS,
      module: ServerStokeiApiIdPrefix.SITES_LIGHT_COLORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdSitesLightColor() {
    if (this.id) {
      this.apply(
        new SitesLightColorCreatedEvent({
          sitesLightColor: this
        })
      );
    }
  }

  updatedSitesLightColor() {
    if (this.id) {
      this.apply(
        new SitesLightColorUpdatedEvent({
          sitesLightColor: this
        })
      );
    }
  }

  removedSitesLightColor() {
    if (this.id) {
      this.apply(
        new SitesLightColorRemovedEvent({
          sitesLightColor: this
        })
      );
    }
  }
}
