import { ICommand } from '@nestjs/cqrs';

import { CreateVideosAuthorDTO } from '@/dtos/videos-authors/create-videos-author.dto';

export class CreateVideosAuthorCommand
  implements ICommand, CreateVideosAuthorDTO
{
  name: string;
  parent: string;
  createdBy: string;

  constructor(data: CreateVideosAuthorDTO) {
    this.name = data.name;
    this.parent = data.parent;
    this.createdBy = data.createdBy;
  }
}
