import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { PageCreatedEvent } from '@/events/implements/pages/page-created.event';
import { PageUpdatedEvent } from '@/events/implements/pages/page-updated.event';
import { PageRemovedEvent } from '@/events/implements/pages/page-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IPageModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class PageModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IPageModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.PAGES,
      module: ServerStokeiApiIdPrefix.PAGES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdPage() {
    if (this.id) {
      this.apply(
        new PageCreatedEvent({
          page: this
        })
      );
    }
  }

  updatedPage() {
    if (this.id) {
      this.apply(
        new PageUpdatedEvent({
          page: this
        })
      );
    }
  }

  removedPage() {
    if (this.id) {
      this.apply(
        new PageRemovedEvent({
          page: this
        })
      );
    }
  }
}
