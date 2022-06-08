import { VideoModel } from '@/models/video.model';

interface IDataVideoRemovedEvent {
  readonly video: VideoModel;
}

export class VideoRemovedEvent {
  readonly video: VideoModel;

  constructor(data: IDataVideoRemovedEvent) {
    this.video = data.video;
  }
}
