import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { KeywordCreatedEvent } from '@/events/implements/keywords/keyword-created.event';
import { KeywordRemovedEvent } from '@/events/implements/keywords/keyword-removed.event';
import { KeywordUpdatedEvent } from '@/events/implements/keywords/keyword-updated.event';

export interface IKeywordModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class KeywordModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IKeywordModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.KEYWORDS,
      module: ServerStokeiApiIdPrefix.KEYWORDS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdKeyword() {
    if (this.id) {
      this.apply(
        new KeywordCreatedEvent({
          keyword: this
        })
      );
    }
  }

  updatedKeyword() {
    if (this.id) {
      this.apply(
        new KeywordUpdatedEvent({
          keyword: this
        })
      );
    }
  }

  removedKeyword() {
    if (this.id) {
      this.apply(
        new KeywordRemovedEvent({
          keyword: this
        })
      );
    }
  }
}
