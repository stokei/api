import { ModulesVideoModel } from '@/models/modules-video.model';

interface IDataModulesVideoCreatedEvent {
  readonly createdBy: string;
  readonly modulesVideo: ModulesVideoModel;
}

export class ModulesVideoCreatedEvent {
  readonly createdBy: string;
  readonly modulesVideo: ModulesVideoModel;

  constructor(data: IDataModulesVideoCreatedEvent) {
    this.createdBy = data.createdBy;
    this.modulesVideo = data.modulesVideo;
  }
}
