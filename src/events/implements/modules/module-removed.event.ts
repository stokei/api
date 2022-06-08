import { ModuleModel } from '@/models/module.model';

interface IDataModuleRemovedEvent {
  readonly module: ModuleModel;
}

export class ModuleRemovedEvent {
  readonly module: ModuleModel;

  constructor(data: IDataModuleRemovedEvent) {
    this.module = data.module;
  }
}
