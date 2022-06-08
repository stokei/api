import { VideosTagModel } from '@/models/videos-tag.model';

interface IDataVideosTagRemovedEvent {
  readonly videosTag: VideosTagModel;
}

export class VideosTagRemovedEvent {
  readonly videosTag: VideosTagModel;

  constructor(data: IDataVideosTagRemovedEvent) {
    this.videosTag = data.videosTag;
  }
}
