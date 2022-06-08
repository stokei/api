import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoRemovedEvent {
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoRemovedEvent {
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoRemovedEvent) {
    this.modulesVideo = data.modulesVideo;
  }
}
