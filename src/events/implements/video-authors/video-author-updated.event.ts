import { VideoAuthorModel } from '@/models/video-author.model';

interface IDataVideoAuthorUpdatedEvent {
  readonly updatedBy: string;
  readonly videoAuthor: VideoAuthorModel;
}

export class VideoAuthorUpdatedEvent {
  readonly updatedBy: string;
  readonly videoAuthor: VideoAuthorModel;

  constructor(data: IDataVideoAuthorUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.videoAuthor = data.videoAuthor;
  }
}
