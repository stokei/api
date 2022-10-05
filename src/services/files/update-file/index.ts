import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateFileCommand } from '@/commands/implements/files/update-file.command';
import { UpdateFileDTO } from '@/dtos/files/update-file.dto';
import { FileModel } from '@/models/file.model';

@Injectable()
export class UpdateFileService
  implements IBaseService<UpdateFileDTO, Promise<FileModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateFileDTO): Promise<FileModel> {
    return await this.commandBus.execute(new UpdateFileCommand(data));
  }
}
