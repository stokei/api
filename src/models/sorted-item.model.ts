import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { SortedItemCreatedEvent } from '@/events/implements/sorted-items/sorted-item-created.event';
import { SortedItemRemovedEvent } from '@/events/implements/sorted-items/sorted-item-removed.event';
import { SortedItemUpdatedEvent } from '@/events/implements/sorted-items/sorted-item-updated.event';

export interface ISortedItemData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly item: string;
  readonly index: number;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class SortedItemModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly item: string;
  readonly index: number;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: ISortedItemData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.SORTED_ITEM,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.item = data.item;
    this.index = data.index;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdSortedItem({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new SortedItemCreatedEvent({
          createdBy,
          sortedItem: this
        })
      );
    }
  }

  updatedSortedItem({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new SortedItemUpdatedEvent({
          updatedBy,
          sortedItem: this
        })
      );
    }
  }

  removedSortedItem({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new SortedItemRemovedEvent({
          removedBy,
          sortedItem: this
        })
      );
    }
  }
}
