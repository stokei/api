import { ModulesMaterialModel } from '@/models/modules-material.model';

interface IDataModulesMaterialUpdatedEvent {
  readonly modulesMaterial: ModulesMaterialModel;
}

export class ModulesMaterialUpdatedEvent {
  readonly modulesMaterial: ModulesMaterialModel;

  constructor(data: IDataModulesMaterialUpdatedEvent) {
    this.modulesMaterial = data.modulesMaterial;
  }
}
