import { ICommand } from '@nestjs/cqrs';

import { StartFileEncodingDTO } from '@/dtos/files/start-file-encoding.dto';

export class StartFileEncodingCommand
  implements ICommand, StartFileEncodingDTO
{
  file: string;
  app: string;
  updatedBy: string;
  constructor(data: StartFileEncodingDTO) {
    this.file = data.file;
    this.app = data.app;
    this.updatedBy = data.updatedBy;
  }
}
