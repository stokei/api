import { VideosSubtitleModel } from '@/models/videos-subtitle.model';

interface IDataVideosSubtitleRemovedEvent {
  readonly videosSubtitle: VideosSubtitleModel;
}

export class VideosSubtitleRemovedEvent {
  readonly videosSubtitle: VideosSubtitleModel;

  constructor(data: IDataVideosSubtitleRemovedEvent) {
    this.videosSubtitle = data.videosSubtitle;
  }
}
