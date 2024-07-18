import { ICommand } from '@nestjs/cqrs';

import { RemoveModuleResoursesDTO } from '@/dtos/modules/remove-module-resources.dto';
import { ModuleModel } from '@/models/module.model';

export class RemoveModuleResourcesCommand
  implements ICommand, RemoveModuleResoursesDTO
{
  module: ModuleModel;
  removedBy: string;
  constructor(data: RemoveModuleResoursesDTO) {
    this.module = data.module;
    this.removedBy = data.removedBy;
  }
}
