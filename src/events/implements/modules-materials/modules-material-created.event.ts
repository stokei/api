import { ModulesMaterialModel } from '@/models/modules-material.model';

interface IDataModulesMaterialCreatedEvent {
  readonly modulesMaterial: ModulesMaterialModel;
}

export class ModulesMaterialCreatedEvent {
  readonly modulesMaterial: ModulesMaterialModel;

  constructor(data: IDataModulesMaterialCreatedEvent) {
    this.modulesMaterial = data.modulesMaterial;
  }
}
