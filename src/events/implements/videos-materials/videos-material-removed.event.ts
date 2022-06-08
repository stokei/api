import { VideosMaterialModel } from '@/models/videos-material.model';

interface IDataVideosMaterialRemovedEvent {
  readonly videosMaterial: VideosMaterialModel;
}

export class VideosMaterialRemovedEvent {
  readonly videosMaterial: VideosMaterialModel;

  constructor(data: IDataVideosMaterialRemovedEvent) {
    this.videosMaterial = data.videosMaterial;
  }
}
