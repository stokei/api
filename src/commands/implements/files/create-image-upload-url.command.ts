import { ICommand } from '@nestjs/cqrs';

import { CreateImageUploadURLDTO } from '@/dtos/files/create-image-upload-url.dto';

export class CreateImageUploadURLCommand
  implements ICommand, CreateImageUploadURLDTO
{
  app: string;
  createdBy: string;

  constructor(data: CreateImageUploadURLDTO) {
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
