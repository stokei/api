import { AggregateRoot } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideoStatus } from '@/enums/video-status.enum';
import { VideoCreatedEvent } from '@/events/implements/videos/video-created.event';
import { VideoRemovedEvent } from '@/events/implements/videos/video-removed.event';
import { VideoUpdatedEvent } from '@/events/implements/videos/video-updated.event';

export interface IVideoModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name?: string;
  readonly slug?: string;
  readonly path?: string;
  readonly url?: string;
  readonly external?: boolean;
  readonly description?: string;
  readonly poster?: string;
  readonly duration?: number;
  readonly status: VideoStatus;
  readonly active: boolean;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VideoModel extends AggregateRoot {
  @ApiProperty()
  readonly id: string;
  @ApiProperty()
  readonly parent: string;
  @ApiProperty({ nullable: true })
  readonly name?: string;
  @ApiProperty({ nullable: true })
  readonly description?: string;
  @ApiProperty({ nullable: true })
  readonly slug?: string;
  @ApiProperty()
  readonly path?: string;
  @ApiProperty()
  readonly url?: string;
  @ApiProperty({ type: Boolean })
  readonly external?: boolean;
  @ApiProperty({ nullable: true })
  readonly poster?: string;
  @ApiProperty({ nullable: true })
  readonly duration?: number;
  @ApiProperty({ enum: VideoStatus })
  readonly status: VideoStatus;
  @ApiProperty()
  readonly active: boolean;
  @ApiProperty({ nullable: true })
  readonly updatedAt?: string;
  @ApiProperty({ nullable: true })
  readonly createdAt?: string;
  @ApiProperty({ nullable: true })
  readonly app: string;
  readonly updatedBy?: string;
  @ApiProperty({ nullable: true })
  readonly createdBy?: string;
  constructor(data: IVideoModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS,
      module: ServerStokeiApiIdPrefix.VIDEOS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.slug = data.slug;
    this.path = data.path;
    this.url = data.url;
    this.external = data.external;
    this.name = data.name;
    this.description = data.description;
    this.poster = data.poster;
    this.duration = data.duration;
    this.status = data.status;
    this.active = this.status === VideoStatus.ACTIVE || data.active;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
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
