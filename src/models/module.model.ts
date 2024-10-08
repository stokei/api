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
  readonly description?: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ModuleModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly description?: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IModuleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdModule({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleCreatedEvent({
          createdBy,
          module: this
        })
      );
    }
  }

  updatedModule({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleUpdatedEvent({
          updatedBy,
          module: this
        })
      );
    }
  }

  removedModule({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleRemovedEvent({
          removedBy,
          module: this
        })
      );
    }
  }
}
