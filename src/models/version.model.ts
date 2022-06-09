import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VersionCreatedEvent } from '@/events/implements/versions/version-created.event';
import { VersionRemovedEvent } from '@/events/implements/versions/version-removed.event';
import { VersionUpdatedEvent } from '@/events/implements/versions/version-updated.event';

export interface IVersionModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VersionModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVersionModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VERSIONS,
      module: ServerStokeiApiIdPrefix.VERSIONS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdVersion() {
    if (this.id) {
      this.apply(
        new VersionCreatedEvent({
          version: this
        })
      );
    }
  }

  updatedVersion() {
    if (this.id) {
      this.apply(
        new VersionUpdatedEvent({
          version: this
        })
      );
    }
  }

  removedVersion() {
    if (this.id) {
      this.apply(
        new VersionRemovedEvent({
          version: this
        })
      );
    }
  }
}
