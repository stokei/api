import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideosTagCreatedEvent } from '@/events/implements/videos-tags/videos-tag-created.event';
import { VideosTagRemovedEvent } from '@/events/implements/videos-tags/videos-tag-removed.event';
import { VideosTagUpdatedEvent } from '@/events/implements/videos-tags/videos-tag-updated.event';

export interface IVideosTagModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VideosTagModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVideosTagModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS_TAGS,
      module: ServerStokeiApiIdPrefix.VIDEOS_TAGS,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdVideosTag() {
    if (this.id) {
      this.apply(
        new VideosTagCreatedEvent({
          videosTag: this
        })
      );
    }
  }

  updatedVideosTag() {
    if (this.id) {
      this.apply(
        new VideosTagUpdatedEvent({
          videosTag: this
        })
      );
    }
  }

  removedVideosTag() {
    if (this.id) {
      this.apply(
        new VideosTagRemovedEvent({
          videosTag: this
        })
      );
    }
  }
}
