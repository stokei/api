import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';
import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';
import { DomainUpdatedEvent } from '@/events/implements/domains/domain-updated.event';

export interface IDomainModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly default: boolean;
  readonly active: boolean;
  readonly fulldomain: string;
  readonly name: string;
  readonly extension: string;
  readonly language: string;
  readonly status: DomainStatus;
  readonly activatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class DomainModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly default: boolean;
  readonly active: boolean;
  readonly fulldomain: string;
  readonly name: string;
  readonly extension: string;
  readonly language: string;
  readonly status: DomainStatus;
  readonly activatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IDomainModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.DOMAINS,
      module: ServerStokeiApiIdPrefix.DOMAINS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.default = data.default;
    this.fulldomain = data.fulldomain;
    this.name = data.name;
    this.extension = data.extension;
    this.language = data.language;
    this.status = data.status;
    this.active = this.status === DomainStatus.ACTIVE || data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
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
