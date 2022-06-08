import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideosAuthorCreatedEvent } from '@/events/implements/videos-authors/videos-author-created.event';
import { VideosAuthorUpdatedEvent } from '@/events/implements/videos-authors/videos-author-updated.event';
import { VideosAuthorRemovedEvent } from '@/events/implements/videos-authors/videos-author-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IVideosAuthorModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VideosAuthorModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVideosAuthorModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS_AUTHORS,
      module: ServerStokeiApiIdPrefix.VIDEOS_AUTHORS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdVideosAuthor() {
    if (this.id) {
      this.apply(
        new VideosAuthorCreatedEvent({
          videosAuthor: this
        })
      );
    }
  }

  updatedVideosAuthor() {
    if (this.id) {
      this.apply(
        new VideosAuthorUpdatedEvent({
          videosAuthor: this
        })
      );
    }
  }

  removedVideosAuthor() {
    if (this.id) {
      this.apply(
        new VideosAuthorRemovedEvent({
          videosAuthor: this
        })
      );
    }
  }
}
