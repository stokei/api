import { ICommand } from '@nestjs/cqrs';

import { CreateModuleVideoDTO } from '@/dtos/module-videos/create-module-video.dto';

export class CreateModuleVideoCommand
  implements ICommand, CreateModuleVideoDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateModuleVideoDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
