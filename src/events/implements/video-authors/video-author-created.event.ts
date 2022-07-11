import { VideoAuthorModel } from '@/models/video-author.model';

interface IDataVideoAuthorCreatedEvent {
  readonly createdBy: string;
  readonly videoAuthor: VideoAuthorModel;
}

export class VideoAuthorCreatedEvent {
  readonly createdBy: string;
  readonly videoAuthor: VideoAuthorModel;

  constructor(data: IDataVideoAuthorCreatedEvent) {
    this.createdBy = data.createdBy;
    this.videoAuthor = data.videoAuthor;
  }
}
