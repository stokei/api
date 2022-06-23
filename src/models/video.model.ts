import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

export interface IVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VideoModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS,
      module: ServerStokeiApiIdPrefix.VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
  }

  createdVideo() {
    if (this.id) {
      this.apply(
        new VideoCreatedEvent({
          video: this
        })
      );
    }
  }

  updatedVideo() {
    if (this.id) {
      this.apply(
        new VideoUpdatedEvent({
          video: this
        })
      );
    }
  }

  removedVideo() {
    if (this.id) {
      this.apply(
        new VideoRemovedEvent({
          video: this
        })
      );
    }
  }
}
