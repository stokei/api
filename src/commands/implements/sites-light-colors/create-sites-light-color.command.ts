import { ICommand } from '@nestjs/cqrs';

import { CreateSitesLightColorDTO } from '@/dtos/sites-light-colors/create-sites-light-color.dto';

export class CreateSitesLightColorCommand
  implements ICommand, CreateSitesLightColorDTO
{
  name: string;
  parent: string;

  constructor(data: CreateSitesLightColorDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
