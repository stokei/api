import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ModuleCreatedEvent } from '@/events/implements/modules/module-created.event';
import { ModuleRemovedEvent } from '@/events/implements/modules/module-removed.event';
import { ModuleUpdatedEvent } from '@/events/implements/modules/module-updated.event';

export interface IModuleModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ModuleModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IModuleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES,
      module: ServerStokeiApiIdPrefix.MODULES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdModule() {
    if (this.id) {
      this.apply(
        new ModuleCreatedEvent({
          module: this
        })
      );
    }
  }

  updatedModule() {
    if (this.id) {
      this.apply(
        new ModuleUpdatedEvent({
          module: this
        })
      );
    }
  }

  removedModule() {
    if (this.id) {
      this.apply(
        new ModuleRemovedEvent({
          module: this
        })
      );
    }
  }
}
