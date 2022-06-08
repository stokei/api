import { VideosTagModel } from '@/models/videos-tag.model';

interface IDataVideosTagUpdatedEvent {
  readonly videosTag: VideosTagModel;
}

export class VideosTagUpdatedEvent {
  readonly videosTag: VideosTagModel;

  constructor(data: IDataVideosTagUpdatedEvent) {
    this.videosTag = data.videosTag;
  }
}
