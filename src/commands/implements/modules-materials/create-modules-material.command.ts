import { ICommand } from '@nestjs/cqrs';

import { CreateModulesMaterialDTO } from '@/dtos/modules-materials/create-modules-material.dto';

export class CreateModulesMaterialCommand
  implements ICommand, CreateModulesMaterialDTO
{
  name: string;
  parent: string;

  constructor(data: CreateModulesMaterialDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
