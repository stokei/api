import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PageCreatedEvent } from '@/events/implements/pages/page-created.event';
import { PageRemovedEvent } from '@/events/implements/pages/page-removed.event';
import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';

export interface IPageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly title: string;
  readonly slug: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class PageModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly title: string;
  readonly slug: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IPageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAGES,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.title = data.title;
    this.slug = data.slug;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdPage({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new PageCreatedEvent({
          createdBy,
          page: this
        })
      );
    }
  }

  updatedPage({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new PageUpdatedEvent({
          updatedBy,
          page: this
        })
      );
    }
  }

  removedPage({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new PageRemovedEvent({
          removedBy,
          page: this
        })
      );
    }
  }
}
