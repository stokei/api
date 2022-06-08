import { CreateFileCommand } from '@/commands/implements/files/create-file.command';
import { CreateFileDTO } from '@/dtos/files/create-file.dto';
import { FileModel } from '@/models/file.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateFileService
  implements IBaseService<CreateFileDTO, Promise<FileModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateFileDTO): Promise<FileModel> {
    return await this.commandBus.execute(new CreateFileCommand(data));
  }
}
