import { ICommand } from '@nestjs/cqrs';

import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';

export class CreateVideoCommand implements ICommand, CreateVideoDTO {
  name: string;
  parent?: string;
  description?: string;
  path: string;
  poster?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoDTO) {
    this.name = data.name;
    this.description = data.description;
    this.path = data.path;
    this.poster = data.poster;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
