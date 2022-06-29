import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoRemovedEvent {
  readonly removedBy: string;
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoRemovedEvent {
  readonly removedBy: string;
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoRemovedEvent) {
    this.removedBy = data.removedBy;
    this.modulesVideo = data.modulesVideo;
  }
}
