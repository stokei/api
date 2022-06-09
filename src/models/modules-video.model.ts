import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ModulesVideoCreatedEvent } from '@/events/implements/modules-videos/modules-video-created.event';
import { ModulesVideoRemovedEvent } from '@/events/implements/modules-videos/modules-video-removed.event';
import { ModulesVideoUpdatedEvent } from '@/events/implements/modules-videos/modules-video-updated.event';

export interface IModulesVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class ModulesVideoModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IModulesVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES_VIDEOS,
      module: ServerStokeiApiIdPrefix.MODULES_VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdModulesVideo() {
    if (this.id) {
      this.apply(
        new ModulesVideoCreatedEvent({
          modulesVideo: this
        })
      );
    }
  }

  updatedModulesVideo() {
    if (this.id) {
      this.apply(
        new ModulesVideoUpdatedEvent({
          modulesVideo: this
        })
      );
    }
  }

  removedModulesVideo() {
    if (this.id) {
      this.apply(
        new ModulesVideoRemovedEvent({
          modulesVideo: this
        })
      );
    }
  }
}
