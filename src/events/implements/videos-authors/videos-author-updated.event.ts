import { VideosAuthorModel } from '@/models/videos-author.model';

interface IDataVideosAuthorUpdatedEvent {
  readonly updatedBy: string;
  readonly videosAuthor: VideosAuthorModel;
}

export class VideosAuthorUpdatedEvent {
  readonly updatedBy: string;
  readonly videosAuthor: VideosAuthorModel;

  constructor(data: IDataVideosAuthorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.videosAuthor = data.videosAuthor;
  }
}
