import { VideoModel } from '@/models/video.model';

interface IDataVideoCreatedEvent {
  readonly createdBy: string;
  readonly video: VideoModel;
}

export class VideoCreatedEvent {
  readonly createdBy: string;
  readonly video: VideoModel;

  constructor(data: IDataVideoCreatedEvent) {
    this.createdBy = data.createdBy;
    this.video = data.video;
  }
}
