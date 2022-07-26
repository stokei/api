import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideoAuthorCreatedEvent } from '@/events/implements/video-authors/video-author-created.event';
import { VideoAuthorRemovedEvent } from '@/events/implements/video-authors/video-author-removed.event';

export interface IVideoAuthorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly video: string;
  readonly author: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VideoAuthorModel extends AggregateRoot {
  readonly id: string;
  readonly video: string;
  readonly author: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly app: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IVideoAuthorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEO_AUTHORS,
      module: ServerStokeiApiIdPrefix.VIDEO_AUTHORS,
      id: data._id?.toString() || data.id
    });
    this.video = data.video;
    this.author = data.author;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.app = data.app;
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdVideoAuthor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new VideoAuthorCreatedEvent({
          createdBy,
          videoAuthor: this
        })
      );
    }
  }

  removedVideoAuthor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new VideoAuthorRemovedEvent({
          removedBy,
          videoAuthor: this
        })
      );
    }
  }
}
