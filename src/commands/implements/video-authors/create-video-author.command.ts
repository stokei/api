import { ICommand } from '@nestjs/cqrs';

import { CreateVideoAuthorDTO } from '@/dtos/video-authors/create-video-author.dto';

export class CreateVideoAuthorCommand
  implements ICommand, CreateVideoAuthorDTO
{
  video: string;
  author: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoAuthorDTO) {
    this.video = data.video;
    this.author = data.author;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
