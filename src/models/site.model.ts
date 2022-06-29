import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SiteCreatedEvent } from '@/events/implements/sites/site-created.event';
import { SiteRemovedEvent } from '@/events/implements/sites/site-removed.event';
import { SiteUpdatedEvent } from '@/events/implements/sites/site-updated.event';

export interface ISiteModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly favicon?: string;
  readonly logo?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SiteModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly favicon?: string;
  readonly logo?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ISiteModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SITES,
      module: ServerStokeiApiIdPrefix.SITES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.favicon = data.favicon;
    this.logo = data.logo;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSite() {
    if (this.id) {
      this.apply(
        new SiteCreatedEvent({
          site: this
        })
      );
    }
  }

  updatedSite() {
    if (this.id) {
      this.apply(
        new SiteUpdatedEvent({
          site: this
        })
      );
    }
  }

  removedSite() {
    if (this.id) {
      this.apply(
        new SiteRemovedEvent({
          site: this
        })
      );
    }
  }
}
