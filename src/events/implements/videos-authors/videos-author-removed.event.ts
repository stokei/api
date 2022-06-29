import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorRemovedEvent {
  readonly removedBy: string;
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorRemovedEvent {
  readonly removedBy: string;
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.videosAuthor = data.videosAuthor;
  }
}
