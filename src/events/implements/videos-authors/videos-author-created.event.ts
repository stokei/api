import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorCreatedEvent {
  readonly createdBy: string;
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorCreatedEvent {
  readonly createdBy: string;
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.videosAuthor = data.videosAuthor;
  }
}
