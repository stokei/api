import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideosMaterialCreatedEvent } from '@/events/implements/videos-materials/videos-material-created.event';
import { VideosMaterialRemovedEvent } from '@/events/implements/videos-materials/videos-material-removed.event';
import { VideosMaterialUpdatedEvent } from '@/events/implements/videos-materials/videos-material-updated.event';

export interface IVideosMaterialModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VideosMaterialModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVideosMaterialModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS_MATERIALS,
      module: ServerStokeiApiIdPrefix.VIDEOS_MATERIALS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdVideosMaterial() {
    if (this.id) {
      this.apply(
        new VideosMaterialCreatedEvent({
          videosMaterial: this
        })
      );
    }
  }

  updatedVideosMaterial() {
    if (this.id) {
      this.apply(
        new VideosMaterialUpdatedEvent({
          videosMaterial: this
        })
      );
    }
  }

  removedVideosMaterial() {
    if (this.id) {
      this.apply(
        new VideosMaterialRemovedEvent({
          videosMaterial: this
        })
      );
    }
  }
}
