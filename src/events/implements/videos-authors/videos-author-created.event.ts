import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorCreatedEvent {
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorCreatedEvent {
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorCreatedEvent) {
    this.videosAuthor = data.videosAuthor;
  }
}
