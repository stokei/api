import { VideoModel } from '@/models/video.model';

interface IDataVideoUpdatedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;
}

export class VideoUpdatedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;

  constructor(data: IDataVideoUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.video = data.video;
  }
}
