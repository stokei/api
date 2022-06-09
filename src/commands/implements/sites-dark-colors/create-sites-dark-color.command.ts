import { ICommand } from '@nestjs/cqrs';

import { CreateSitesDarkColorDTO } from '@/dtos/sites-dark-colors/create-sites-dark-color.dto';

export class CreateSitesDarkColorCommand
  implements ICommand, CreateSitesDarkColorDTO
{
  name: string;
  parent: string;

  constructor(data: CreateSitesDarkColorDTO) {
    this.name = data.name;
    this.parent = data.parent;
  }
}
