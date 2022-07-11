import { ModuleVideoModel } from '@/models/module-video.model';

interface IDataModuleVideoCreatedEvent {
  readonly createdBy: string;
  readonly moduleVideo: ModuleVideoModel;
}

export class ModuleVideoCreatedEvent {
  readonly createdBy: string;
  readonly moduleVideo: ModuleVideoModel;

  constructor(data: IDataModuleVideoCreatedEvent) {
    this.createdBy = data.createdBy;
    this.moduleVideo = data.moduleVideo;
  }
}
