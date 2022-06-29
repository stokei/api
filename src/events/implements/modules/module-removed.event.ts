import { ModuleModel } from '@/models/module.model';

interface IDataModuleRemovedEvent {
  readonly removedBy: string;
  readonly module: ModuleModel;
}

export class ModuleRemovedEvent {
  readonly removedBy: string;
  readonly module: ModuleModel;

  constructor(data: IDataModuleRemovedEvent) {
    this.removedBy = data.removedBy;
    this.module = data.module;
  }
}
