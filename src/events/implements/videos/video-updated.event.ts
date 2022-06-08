import { VideoModel } from '@/models/video.model';

interface IDataVideoUpdatedEvent {
  readonly video: VideoModel;
}

export class VideoUpdatedEvent {
  readonly video: VideoModel;

  constructor(data: IDataVideoUpdatedEvent) {
    this.video = data.video;
  }
}
