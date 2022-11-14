import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { ActivateFileCommand } from '@/commands/implements/files/activate-file.command';
import { ActivateFileDTO } from '@/dtos/files/activate-file.dto';
import { FileModel } from '@/models/file.model';

@Injectable()
export class ActivateFileService
  implements IBaseService<ActivateFileDTO, Promise<FileModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: ActivateFileDTO): Promise<FileModel> {
    return await this.commandBus.execute(new ActivateFileCommand(data));
  }
}
