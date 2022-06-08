import { VideoModel } from '@/models/video.model';

interface IDataVideoCreatedEvent {
  readonly video: VideoModel;
}

export class VideoCreatedEvent {
  readonly video: VideoModel;

  constructor(data: IDataVideoCreatedEvent) {
    this.video = data.video;
  }
}
