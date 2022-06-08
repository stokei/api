import { ModulesMaterialModel } from '@/models/modules-material.model';

interface IDataModulesMaterialRemovedEvent {
  readonly modulesMaterial: ModulesMaterialModel;
}

export class ModulesMaterialRemovedEvent {
  readonly modulesMaterial: ModulesMaterialModel;

  constructor(data: IDataModulesMaterialRemovedEvent) {
    this.modulesMaterial = data.modulesMaterial;
  }
}
