import { ModuleModel } from '@/models/module.model';

interface IDataModuleCreatedEvent {
  readonly createdBy: string;
  readonly module: ModuleModel;
}

export class ModuleCreatedEvent {
  readonly createdBy: string;
  readonly module: ModuleModel;

  constructor(data: IDataModuleCreatedEvent) {
    this.createdBy = data.createdBy;
    this.module = data.module;
  }
}
