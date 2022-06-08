import { ModuleModel } from '@/models/module.model';

interface IDataModuleCreatedEvent {
  readonly module: ModuleModel;
}

export class ModuleCreatedEvent {
  readonly module: ModuleModel;

  constructor(data: IDataModuleCreatedEvent) {
    this.module = data.module;
  }
}
