import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { MaterialCreatedEvent } from '@/events/implements/materials/material-created.event';
import { MaterialRemovedEvent } from '@/events/implements/materials/material-removed.event';
import { MaterialUpdatedEvent } from '@/events/implements/materials/material-updated.event';

export interface IMaterialModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly app: string;
  readonly parent: string;
  readonly private?: boolean;
  readonly file: string;
  readonly name: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class MaterialModel extends AggregateRoot {
  readonly id: string;
  readonly app: string;
  readonly parent: string;
  readonly private?: boolean;
  readonly file: string;
  readonly name: string;
  readonly description?: string;
  readonly avatar?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IMaterialModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MATERIALS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.app = data.app;
    this.private = !!data.private;
    this.file = data.file;
    this.name = data.name;
    this.description = data.description;
    this.avatar = data.avatar;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdMaterial({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new MaterialCreatedEvent({
          createdBy,
          material: this
        })
      );
    }
  }

  updatedMaterial({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new MaterialUpdatedEvent({
          updatedBy,
          material: this
        })
      );
    }
  }

  removedMaterial({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new MaterialRemovedEvent({
          removedBy,
          material: this
        })
      );
    }
  }
}
