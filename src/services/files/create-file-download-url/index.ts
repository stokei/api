import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateFileDownloadURLCommand } from '@/commands/implements/files/create-file-download-url.command';
import { CreateFileDownloadURLDTO } from '@/dtos/files/create-file-download-url.dto';
import { FileModel } from '@/models/file.model';

@Injectable()
export class CreateFileDownloadURLService
  implements IBaseService<CreateFileDownloadURLDTO, Promise<FileModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateFileDownloadURLDTO): Promise<FileModel> {
    return await this.commandBus.execute(
      new CreateFileDownloadURLCommand(data)
    );
  }
}
