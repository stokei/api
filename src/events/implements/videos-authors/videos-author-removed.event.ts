import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorRemovedEvent {
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorRemovedEvent {
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorRemovedEvent) {
    this.videosAuthor = data.videosAuthor;
  }
}
