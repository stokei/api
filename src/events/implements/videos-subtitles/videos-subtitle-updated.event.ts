import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

interface IDataVideosSubtitleUpdatedEvent {
  readonly videosSubtitle: VideosSubtitleModel;
}

export class VideosSubtitleUpdatedEvent {
  readonly videosSubtitle: VideosSubtitleModel;

  constructor(data: IDataVideosSubtitleUpdatedEvent) {
    this.videosSubtitle = data.videosSubtitle;
  }
}
