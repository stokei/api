import { VideoAuthorModel } from '@/models/video-author.model';

interface IDataVideoAuthorRemovedEvent {
  readonly removedBy: string;
  readonly videoAuthor: VideoAuthorModel;
}

export class VideoAuthorRemovedEvent {
  readonly removedBy: string;
  readonly videoAuthor: VideoAuthorModel;

  constructor(data: IDataVideoAuthorRemovedEvent) {
    this.removedBy = data.removedBy;
    this.videoAuthor = data.videoAuthor;
  }
}
