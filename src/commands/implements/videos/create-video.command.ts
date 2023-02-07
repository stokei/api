import { ICommand } from '@nestjs/cqrs';

import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';

export class CreateVideoCommand implements ICommand, CreateVideoDTO {
  parent: string;
  name: string;
  description?: string;
  file?: string;
  poster?: string;
  private?: boolean;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoDTO) {
    this.parent = data.parent;
    this.file = data.file;
    this.name = data.name;
    this.private = data.private;
    this.description = data.description;
    this.poster = data.poster;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
