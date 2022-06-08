import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

interface IDataVideosSubtitleCreatedEvent {
  readonly videosSubtitle: VideosSubtitleModel;
}

export class VideosSubtitleCreatedEvent {
  readonly videosSubtitle: VideosSubtitleModel;

  constructor(data: IDataVideosSubtitleCreatedEvent) {
    this.videosSubtitle = data.videosSubtitle;
  }
}
