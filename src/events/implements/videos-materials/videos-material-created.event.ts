import { VideosMaterialModel } from '@/models/videos-material.model';

interface IDataVideosMaterialCreatedEvent {
  readonly videosMaterial: VideosMaterialModel;
}

export class VideosMaterialCreatedEvent {
  readonly videosMaterial: VideosMaterialModel;

  constructor(data: IDataVideosMaterialCreatedEvent) {
    this.videosMaterial = data.videosMaterial;
  }
}
