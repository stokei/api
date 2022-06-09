import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { FileCreatedEvent } from '@/events/implements/files/file-created.event';
import { FileRemovedEvent } from '@/events/implements/files/file-removed.event';
import { FileUpdatedEvent } from '@/events/implements/files/file-updated.event';

export interface IFileModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class FileModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IFileModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.FILES,
      module: ServerStokeiApiIdPrefix.FILES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdFile() {
    if (this.id) {
      this.apply(
        new FileCreatedEvent({
          file: this
        })
      );
    }
  }

  updatedFile() {
    if (this.id) {
      this.apply(
        new FileUpdatedEvent({
          file: this
        })
      );
    }
  }

  removedFile() {
    if (this.id) {
      this.apply(
        new FileRemovedEvent({
          file: this
        })
      );
    }
  }
}
