import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideoStatus } from '@/enums/video-status.enum';
import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

export interface IVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly name: string;
  readonly slug: string;
  readonly path: string;
  readonly description?: string;
  readonly poster?: string;
  readonly duration?: number;
  readonly status: VideoStatus;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VideoModel extends AggregateRoot {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly path: string;
  readonly description?: string;
  readonly poster?: string;
  readonly duration?: number;
  readonly status: VideoStatus;
  readonly active: boolean;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS,
      module: ServerStokeiApiIdPrefix.VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.slug = data.slug;
    this.path = data.path;
    this.name = data.name;
    this.description = data.description;
    this.poster = data.poster;
    this.duration = data.duration;
    this.status = data.status;
    this.active = this.status === VideoStatus.ACTIVE || data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdVideo({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new VideoCreatedEvent({
          createdBy,
          video: this
        })
      );
    }
  }

  updatedVideo({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new VideoUpdatedEvent({
          updatedBy,
          video: this
        })
      );
    }
  }

  removedVideo({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new VideoRemovedEvent({
          removedBy,
          video: this
        })
      );
    }
  }
}
