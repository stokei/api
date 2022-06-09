import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ModulesMaterialCreatedEvent } from '@/events/implements/modules-materials/modules-material-created.event';
import { ModulesMaterialRemovedEvent } from '@/events/implements/modules-materials/modules-material-removed.event';
import { ModulesMaterialUpdatedEvent } from '@/events/implements/modules-materials/modules-material-updated.event';

export interface IModulesMaterialModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ModulesMaterialModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IModulesMaterialModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES_MATERIALS,
      module: ServerStokeiApiIdPrefix.MODULES_MATERIALS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdModulesMaterial() {
    if (this.id) {
      this.apply(
        new ModulesMaterialCreatedEvent({
          modulesMaterial: this
        })
      );
    }
  }

  updatedModulesMaterial() {
    if (this.id) {
      this.apply(
        new ModulesMaterialUpdatedEvent({
          modulesMaterial: this
        })
      );
    }
  }

  removedModulesMaterial() {
    if (this.id) {
      this.apply(
        new ModulesMaterialRemovedEvent({
          modulesMaterial: this
        })
      );
    }
  }
}
