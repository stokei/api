import { VideoModel } from '@/models/video.model';

interface IDataVideoRemovedEvent {
  readonly removedBy: string;
  readonly video: VideoModel;
}

export class VideoRemovedEvent {
  readonly removedBy: string;
  readonly video: VideoModel;

  constructor(data: IDataVideoRemovedEvent) {
    this.removedBy = data.removedBy;
    this.video = data.video;
  }
}
