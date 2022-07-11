import { ModuleVideoModel } from '@/models/module-video.model';

interface IDataModuleVideoRemovedEvent {
  readonly removedBy: string;
  readonly moduleVideo: ModuleVideoModel;
}

export class ModuleVideoRemovedEvent {
  readonly removedBy: string;
  readonly moduleVideo: ModuleVideoModel;

  constructor(data: IDataModuleVideoRemovedEvent) {
    this.removedBy = data.removedBy;
    this.moduleVideo = data.moduleVideo;
  }
}
