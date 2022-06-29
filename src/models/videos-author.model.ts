import { AggregateRoot } from '@nestjs/cqrs';
import { convertToISODateString, createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideosAuthorCreatedEvent } from '@/events/implements/videos-authors/videos-author-created.event';
import { VideosAuthorRemovedEvent } from '@/events/implements/videos-authors/videos-author-removed.event';
import { VideosAuthorUpdatedEvent } from '@/events/implements/videos-authors/videos-author-updated.event';

export interface IVideosAuthorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly video: string;
  readonly author: string;
  readonly updatedAt?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
}

export class VideosAuthorModel extends AggregateRoot {
  readonly id: string;
  readonly video: string;
  readonly author: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  readonly updatedBy?: string;
  readonly createdBy?: string;
  constructor(data: IVideosAuthorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS_AUTHORS,
      module: ServerStokeiApiIdPrefix.VIDEOS_AUTHORS,
      id: data._id?.toString() || data.id
    });
    this.video = data.video;
    this.author = data.author;
    this.updatedAt = convertToISODateString(data.updatedAt);
    this.createdAt = convertToISODateString(data.createdAt);
    this.updatedBy = data.updatedBy;
    this.createdBy = data.createdBy;
  }

  createdVideosAuthor({ createdBy }: { createdBy: string }) {
    if (this.id) {
      this.apply(
        new VideosAuthorCreatedEvent({
          createdBy,
          videosAuthor: this
        })
      );
    }
  }

  updatedVideosAuthor({ updatedBy }: { updatedBy: string }) {
    if (this.id) {
      this.apply(
        new VideosAuthorUpdatedEvent({
          updatedBy,
          videosAuthor: this
        })
      );
    }
  }

  removedVideosAuthor({ removedBy }: { removedBy: string }) {
    if (this.id) {
      this.apply(
        new VideosAuthorRemovedEvent({
          removedBy,
          videosAuthor: this
        })
      );
    }
  }
}
