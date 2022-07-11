import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ModuleVideoCreatedEvent } from '@/events/implements/module-videos/module-video-created.event';
import { ModuleVideoRemovedEvent } from '@/events/implements/module-videos/module-video-removed.event';
import { ModuleVideoUpdatedEvent } from '@/events/implements/module-videos/module-video-updated.event';

export interface IModuleVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly module: string;
  readonly video: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ModuleVideoModel extends AggregateRoot {
  readonly id: string;
  readonly module: string;
  readonly video: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IModuleVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULE_VIDEOS,
      module: ServerStokeiApiIdPrefix.MODULE_VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.module = data.module;
    this.video = data.video;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdModuleVideo({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleVideoCreatedEvent({
          createdBy,
          moduleVideo: this
        })
      );
    }
  }

  updatedModuleVideo({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleVideoUpdatedEvent({
          updatedBy,
          moduleVideo: this
        })
      );
    }
  }

  removedModuleVideo({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ModuleVideoRemovedEvent({
          removedBy,
          moduleVideo: this
        })
      );
    }
  }
}
