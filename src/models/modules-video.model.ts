import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { ModulesVideoCreatedEvent } from '@/events/implements/modules-videos/modules-video-created.event';
import { ModulesVideoRemovedEvent } from '@/events/implements/modules-videos/modules-video-removed.event';
import { ModulesVideoUpdatedEvent } from '@/events/implements/modules-videos/modules-video-updated.event';

export interface IModulesVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly module: string;
  readonly video: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class ModulesVideoModel extends AggregateRoot {
  readonly id: string;
  readonly module: string;
  readonly video: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IModulesVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.MODULES_VIDEOS,
      module: ServerStokeiApiIdPrefix.MODULES_VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.module = data.module;
    this.video = data.video;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdModulesVideo({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new ModulesVideoCreatedEvent({
          createdBy,
          modulesVideo: this
        })
      );
    }
  }

  updatedModulesVideo({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new ModulesVideoUpdatedEvent({
          updatedBy,
          modulesVideo: this
        })
      );
    }
  }

  removedModulesVideo({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new ModulesVideoRemovedEvent({
          removedBy,
          modulesVideo: this
        })
      );
    }
  }
}
