import { ICommand } from '@nestjs/cqrs';

import { CreateVideoDTO } from '@/dtos/videos/create-video.dto';

export class CreateVideoCommand implements ICommand, CreateVideoDTO {
  name: string;
  parent: string;
  description?: string;
  temporaryURL?: string;
  filename?: string;
  url?: string;
  poster?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateVideoDTO) {
    this.parent = data.parent;
    this.name = data.name;
    this.description = data.description;
    this.temporaryURL = data.temporaryURL;
    this.filename = data.filename;
    this.poster = data.poster;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
