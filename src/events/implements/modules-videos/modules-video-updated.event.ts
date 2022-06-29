import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoUpdatedEvent {
  readonly updatedBy: string;
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoUpdatedEvent {
  readonly updatedBy: string;
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.modulesVideo = data.modulesVideo;
  }
}
