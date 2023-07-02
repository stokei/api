interface IDataVideoViewIncrementedSuccessfullyEvent {
  videoView: string;
  viewedDuration: number;
  app: string;
  createdBy: string;
}

export class VideoViewIncrementedSuccessfullyEvent {
  videoView: string;
  viewedDuration: number;
  app: string;
  createdBy: string;

  constructor(data: IDataVideoViewIncrementedSuccessfullyEvent) {
    this.videoView = data.videoView;
    this.viewedDuration = data.viewedDuration;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
