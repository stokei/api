import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SitesDarkColorCreatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-created.event';
import { SitesDarkColorRemovedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-removed.event';
import { SitesDarkColorUpdatedEvent } from '@/events/implements/sites-dark-colors/sites-dark-color-updated.event';

export interface ISitesDarkColorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class SitesDarkColorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ISitesDarkColorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SITES_DARK_COLORS,
      module: ServerStokeiApiIdPrefix.SITES_DARK_COLORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdSitesDarkColor() {
    if (this.id) {
      this.apply(
        new SitesDarkColorCreatedEvent({
          sitesDarkColor: this
        })
      );
    }
  }

  updatedSitesDarkColor() {
    if (this.id) {
      this.apply(
        new SitesDarkColorUpdatedEvent({
          sitesDarkColor: this
        })
      );
    }
  }

  removedSitesDarkColor() {
    if (this.id) {
      this.apply(
        new SitesDarkColorRemovedEvent({
          sitesDarkColor: this
        })
      );
    }
  }
}
