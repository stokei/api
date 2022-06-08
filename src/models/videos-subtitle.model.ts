import { ServerStokeiApiIdPrefix } from '@/enums/server-id-prefix.enum';
import { VideosSubtitleCreatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-created.event';
import { VideosSubtitleUpdatedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-updated.event';
import { VideosSubtitleRemovedEvent } from '@/events/implements/videos-subtitles/videos-subtitle-removed.event';
import { AggregateRoot } from '@nestjs/cqrs';
import { createServiceId } from '@stokei/nestjs';

export interface IVideosSubtitleModelData {
  readonly id?: string;
  readonly _id?: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
}

export class VideosSubtitleModel extends AggregateRoot {
  readonly id: string;
  readonly parent: string;
  readonly name: string;
  readonly updatedAt?: string;
  readonly createdAt?: string;
  constructor(data: IVideosSubtitleModelData) {
    super();

    this.id = createServiceId({
      service: ServerStokeiApiIdPrefix.VIDEOS_SUBTITLES,
      module: ServerStokeiApiIdPrefix.VIDEOS_SUBTITLES,
      id: data._id?.toString() || data.id
    });
    this.parent = data.parent;
    this.name = data.name;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  createdVideosSubtitle() {
    if (this.id) {
      this.apply(
        new VideosSubtitleCreatedEvent({
          videosSubtitle: this
        })
      );
    }
  }

  updatedVideosSubtitle() {
    if (this.id) {
      this.apply(
        new VideosSubtitleUpdatedEvent({
          videosSubtitle: this
        })
      );
    }
  }

  removedVideosSubtitle() {
    if (this.id) {
      this.apply(
        new VideosSubtitleRemovedEvent({
          videosSubtitle: this
        })
      );
    }
  }
}
