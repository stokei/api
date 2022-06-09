import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { CategoryCreatedEvent } from '@/events/implements/categories/category-created.event';
import { CategoryRemovedEvent } from '@/events/implements/categories/category-removed.event';
import { CategoryUpdatedEvent } from '@/events/implements/categories/category-updated.event';

export interface ICategoryModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class CategoryModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: ICategoryModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.CATEGORIES,
      module: ServerStokeiApiIdPrefix.CATEGORIES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdCategory() {
    if (this.id) {
      this.apply(
        new CategoryCreatedEvent({
          category: this
        })
      );
    }
  }

  updatedCategory() {
    if (this.id) {
      this.apply(
        new CategoryUpdatedEvent({
          category: this
        })
      );
    }
  }

  removedCategory() {
    if (this.id) {
      this.apply(
        new CategoryRemovedEvent({
          category: this
        })
      );
    }
  }
}
