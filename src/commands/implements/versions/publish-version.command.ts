import { ICommand } from '@nestjs/cqrs';

import { PublishVersionDTO } from '@/dtos/versions/publish-version.dto';

export class PublishVersionCommand implements ICommand, PublishVersionDTO {
  version: string;
  app: string;
  createdBy: string;

  constructor(data: PublishVersionDTO) {
    this.version = data.version;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
