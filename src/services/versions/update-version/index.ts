import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateVersionCommand } from '@/commands/implements/versions/update-version.command';
import { UpdateVersionDTO } from '@/dtos/versions/update-version.dto';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class UpdateVersionService
  implements IBaseService<UpdateVersionDTO, Promise<VersionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateVersionDTO): Promise<VersionModel> {
    return await this.commandBus.execute(new UpdateVersionCommand(data));
  }
}
