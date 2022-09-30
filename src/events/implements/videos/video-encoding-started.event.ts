import { VideoModel } from '@/models/video.model';

interface IDataVideoEncodingStartedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;
}

export class VideoEncodingStartedEvent {
  readonly updatedBy: string;
  readonly video: VideoModel;

  constructor(data: IDataVideoEncodingStartedEvent) {
    this.updatedBy = data.updatedBy;
    this.video = data.video;
  }
}
