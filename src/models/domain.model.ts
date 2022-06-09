import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';
import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';
import { DomainUpdatedEvent } from '@/events/implements/domains/domain-updated.event';

export interface IDomainModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class DomainModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IDomainModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.DOMAINS,
      module: ServerStokeiApiIdPrefix.DOMAINS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdDomain() {
    if (this.id) {
      this.apply(
        new DomainCreatedEvent({
          domain: this
        })
      );
    }
  }

  updatedDomain() {
    if (this.id) {
      this.apply(
        new DomainUpdatedEvent({
          domain: this
        })
      );
    }
  }

  removedDomain() {
    if (this.id) {
      this.apply(
        new DomainRemovedEvent({
          domain: this
        })
      );
    }
  }
}
