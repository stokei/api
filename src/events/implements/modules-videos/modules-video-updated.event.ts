import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoUpdatedEvent {
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoUpdatedEvent {
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoUpdatedEvent) {
    this.modulesVideo = data.modulesVideo;
  }
}
