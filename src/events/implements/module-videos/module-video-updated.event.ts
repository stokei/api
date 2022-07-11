import { ModuleVideoModel } from '@/models/module-video.model';

interface IDataModuleVideoUpdatedEvent {
  readonly updatedBy: string;
  readonly moduleVideo: ModuleVideoModel;
}

export class ModuleVideoUpdatedEvent {
  readonly updatedBy: string;
  readonly moduleVideo: ModuleVideoModel;

  constructor(data: IDataModuleVideoUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.moduleVideo = data.moduleVideo;
  }
}
