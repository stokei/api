import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VersionCreatedEvent } from '@/events/implements/versions/version-created.event';
import { VersionRemovedEvent } from '@/events/implements/versions/version-removed.event';
import { VersionUpdatedEvent } from '@/events/implements/versions/version-updated.event';

export interface IVersionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent?: string;
  readonly name: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VersionModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent?: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;

  constructor(data: IVersionModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VERSIONS,
      id: data._id?.toString() || data.id
    });
    this.app = data.app;
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdVersion({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new VersionCreatedEvent({
          createdBy,
          version: this
        })
      );
    }
  }

  updatedVersion({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new VersionUpdatedEvent({
          updatedBy,
          version: this
        })
      );
    }
  }

  removedVersion({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new VersionRemovedEvent({
          removedBy,
          version: this
        })
      );
    }
  }
}
