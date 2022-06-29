import { ModuleModel } from '@/models/module.model';

interface IDataModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly module: ModuleModel;
}

export class ModuleUpdatedEvent {
  readonly updatedBy: string;
  readonly module: ModuleModel;

  constructor(data: IDataModuleUpdatedEvent) {
    this.updatedBy = data.updatedBy;
    this.module = data.module;
  }
}
