import { ModuleModel } from '@/models/module.model';

export interface RemoveModuleResoursesDTO {
  module: ModuleModel;
  removedBy: string;
}
