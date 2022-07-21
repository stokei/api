import { ICommand } from '@nestjs/cqrs';

import { CreateVideoAuthorDTO } from '@/dtos/video-authors/create-video-author.dto';

export class CreateVideoAuthorCommand
  implements ICommand, CreateVideoAuthorDTO
{
  video: string;
  author: string;
  createdBy: string;

  constructor(data: CreateVideoAuthorDTO) {
    this.video = data.video;
    this.author = data.author;
    this.createdBy = data.createdBy;
  }
}
