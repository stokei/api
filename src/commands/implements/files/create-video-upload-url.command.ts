import { ICommand } from '@nestjs/cqrs';

import { CreateVideoUploadURLDTO } from '@/dtos/files/create-video-upload-url.dto';

export class CreateVideoUploadURLCommand
  implements ICommand, CreateVideoUploadURLDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreateVideoUploadURLDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
