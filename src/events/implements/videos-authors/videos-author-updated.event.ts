import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorUpdatedEvent {
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorUpdatedEvent {
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorUpdatedEvent) {
    this.videosAuthor = data.videosAuthor;
  }
}
