import { ICommand } from '@nestjs/cqrs';

import { CreateFileDownloadURLDTO } from '@/dtos/files/create-file-download-url.dto';

export class CreateFileDownloadURLCommand
  implements ICommand, CreateFileDownloadURLDTO
{
  file: string;
  app: string;
  createdBy: string;

  constructor(data: CreateFileDownloadURLDTO) {
    this.file = data.file;
    this.app = data.app;
    this.createdBy = data.createdBy;
  }
}
