import { VideosMaterialModel } from '@/models/videos-material.model';

interface IDataVideosMaterialUpdatedEvent {
  readonly videosMaterial: VideosMaterialModel;
}

export class VideosMaterialUpdatedEvent {
  readonly videosMaterial: VideosMaterialModel;

  constructor(data: IDataVideosMaterialUpdatedEvent) {
    this.videosMaterial = data.videosMaterial;
  }
}
