import { CreateVersionCommand } from '@/commands/implements/versions/create-version.command';
import { CreateVersionDTO } from '@/dtos/versions/create-version.dto';
import { VersionModel } from '@/models/version.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateVersionService
  implements IBaseService<CreateVersionDTO, Promise<VersionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateVersionDTO): Promise<VersionModel> {
    return await this.commandBus.execute(new CreateVersionCommand(data));
  }
}
