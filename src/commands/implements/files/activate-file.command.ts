import { ICommand } from '@nestjs/cqrs';

import { ActivateFileDTO } from '@/dtos/files/activate-file.dto';

export class ActivateFileCommand implements ICommand, ActivateFileDTO {
  file: string;
  app: string;
  updatedBy: string;
  constructor(data: ActivateFileDTO) {
    this.file = data.file;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
