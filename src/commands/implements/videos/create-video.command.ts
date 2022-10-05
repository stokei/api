import { ICommand } from '@nestjs/cqrs';

import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';

export class CreateVideoCommand implements ICommand, CreateVideoDTO {
  parent: string;
  file: string;
  name?: string;
  description?: string;
  poster?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoDTO) {
    this.parent = data.parent;
    this.file = data.file;
    this.name = data.name;
    this.description = data.description;
    this.poster = data.poster;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
