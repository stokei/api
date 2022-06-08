import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoCreatedEvent {
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoCreatedEvent {
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoCreatedEvent) {
    this.modulesVideo = data.modulesVideo;
  }
}
