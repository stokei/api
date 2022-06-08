import { VideosTagModel } from '@/models/videos-tag.model';

interface IDataVideosTagCreatedEvent {
  readonly videosTag: VideosTagModel;
}

export class VideosTagCreatedEvent {
  readonly videosTag: VideosTagModel;

  constructor(data: IDataVideosTagCreatedEvent) {
    this.videosTag = data.videosTag;
  }
}
