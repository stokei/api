import { ModuleModel } from '@/models/module.model';

interface IDataModuleUpdatedEvent {
  readonly module: ModuleModel;
}

export class ModuleUpdatedEvent {
  readonly module: ModuleModel;

  constructor(data: IDataModuleUpdatedEvent) {
    this.module = data.module;
  }
}
