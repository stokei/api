import { ICommand } from '@nestjs/cqrs';

import { CreateFileDTO } from '@/dtos/files/create-file.dto';

export class CreateFileCommand implements ICommand, CreateFileDTO {
  filename?: string;
  extension?: string;
  mimetype?: string;
  size?: number;
  duration?: number;
  url?: string;
  app: string;
  createdBy: string;

  constructor(data: CreateFileDTO) {
    this.filename = data.filename;
    this.extension = data.extension;
    this.mimetype = data.mimetype;
    this.size = data.size;
    this.duration = data.duration;
    this.url = data.url;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
