import { ICommand } from '@nestjs/cqrs';

import { CreateModulesVideoDTO } from '@/dtos/modules-videos/create-modules-video.dto';

export class CreateModulesVideoCommand
  implements ICommand, CreateModulesVideoDTO
{
  name: string;
  parent: string;

  constructor(data: CreateModulesVideoDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
