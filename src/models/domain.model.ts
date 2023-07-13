import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { DomainStatus } from '@/enums/domain-status.enum';
import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { IS_DEVELOPMENT } from '@/environments';
import { DomainActivatedEvent } from '@/events/implements/domains/domain-activated.event';
import { DomainCreatedEvent } from '@/events/implements/domains/domain-created.event';
import { DomainRemovedEvent } from '@/events/implements/domains/domain-removed.event';

export interface IDomainModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly active: boolean;
  readonly free?: boolean;
  readonly name: string;
  readonly status: DomainStatus;
  readonly activatedAt?: Date | string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class DomainModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly url: string;
  readonly active: boolean;
  readonly free?: boolean;
  readonly status: DomainStatus;
  readonly activatedAt?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IDomainModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.DOMAINS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.url = this.getDomainURL();
    this.free = !!data.free;
    this.status = data.status;
    this.active = this.status === DomainStatus.ACTIVE || data.active;
    this.activatedAt = convertToISODateString(data.activatedAt);
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  private getDomainURL() {
    if (IS_DEVELOPMENT) {
      return 'http://' + this.name;
    }
    return 'https://' + this.name;
  }

  createdDomain({
    createdBy,
    isDefault
  }: {
    createdBy: string;
    isDefault: boolean;
  }) {
    if (this.id) {
      this.apply(
        new DomainCreatedEvent({
          createdBy,
          isDefault,
          domain: this
        })
      );
    }
  }

  removedDomain({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new DomainRemovedEvent({
          removedBy,
          domain: this
        })
      );
    }
  }

  activatedDomain({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new DomainActivatedEvent({
          updatedBy,
          domain: this
        })
      );
    }
  }
}
