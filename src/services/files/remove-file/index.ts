import { RemoveFileCommand } from '@/commands/implements/files/remove-file.command';
import { RemoveFileDTO } from '@/dtos/files/remove-file.dto';
import { FileModel } from '@/models/file.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class RemoveFileService
  implements IBaseService<RemoveFileDTO, Promise<FileModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveFileDTO): Promise<FileModel> {
    return await this.commandBus.execute(new RemoveFileCommand(data));
  }
}
