import { ICommand } from '@nestjs/cqrs';

import { CreateVideoAuthorDTO } from '@/dtos/video-authors/create-video-author.dto';

export class CreateVideoAuthorCommand
  implements ICommand, CreateVideoAuthorDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateVideoAuthorDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
