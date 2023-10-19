import { VideoModel } from '@/models/video.model';

interface IDataVideoActivatedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;
}

export class VideoActivatedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;

  constructor(data: IDataVideoActivatedEvent) {
    this.updatedBy = data.updatedBy;
    this.video = data.video;
  }
}
