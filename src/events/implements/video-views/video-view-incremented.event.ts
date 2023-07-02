import { IncrementVideoViewDTO } from '@/dtos/video-views/increment-video-view.dto';

export class VideoViewIncrementedEvent {
  videoView: string;
  app: string;
  createdBy: string;

  constructor(data: IncrementVideoViewDTO) {
    this.videoView = data.videoView;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
