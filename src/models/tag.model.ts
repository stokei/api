import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { TagCreatedEvent } from '@/events/implements/tags/tag-created.event';
import { TagRemovedEvent } from '@/events/implements/tags/tag-removed.event';
import { TagUpdatedEvent } from '@/events/implements/tags/tag-updated.event';

export interface ITagModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class TagModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ITagModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.TAGS,
      module: ServerStokeiApiIdPrefix.TAGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdTag() {
    if (this.id) {
      this.apply(
        new TagCreatedEvent({
          tag: this
        })
      );
    }
  }

  updatedTag() {
    if (this.id) {
      this.apply(
        new TagUpdatedEvent({
          tag: this
        })
      );
    }
  }

  removedTag() {
    if (this.id) {
      this.apply(
        new TagRemovedEvent({
          tag: this
        })
      );
    }
  }
}
