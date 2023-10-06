import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SiteCreatedEvent } from '@/events/implements/sites/site-created.event';
import { SiteRemovedEvent } from '@/events/implements/sites/site-removed.event';
import { SiteUpdatedEvent } from '@/events/implements/sites/site-updated.event';

export interface ISiteModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly slug: string;
  readonly favicon?: string;
  readonly logo?: string;
  readonly defaultDomain?: string;
  readonly homePage?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SiteModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly name: string;
  readonly slug: string;
  readonly favicon?: string;
  readonly logo?: string;
  readonly defaultDomain?: string;
  readonly homePage?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: ISiteModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SITES,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.name = data.name;
    this.slug = data.slug;
    this.favicon = data.favicon;
    this.logo = data.logo;
    this.defaultDomain = data.defaultDomain;
    this.homePage = data.homePage;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSite({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SiteCreatedEvent({
          createdBy,
          site: this
        })
      );
    }
  }

  updatedSite({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new SiteUpdatedEvent({
          updatedBy,
          site: this
        })
      );
    }
  }

  removedSite({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new SiteRemovedEvent({
          removedBy,
          site: this
        })
      );
    }
  }
}
