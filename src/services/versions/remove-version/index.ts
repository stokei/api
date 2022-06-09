import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveVersionCommand } from '@/commands/implements/versions/remove-version.command';
import { RemoveVersionDTO } from '@/dtos/versions/remove-version.dto';
import { VersionModel } from '@/models/version.model';

@Injectable()
export class RemoveVersionService
  implements IBaseService<RemoveVersionDTO, Promise<VersionModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveVersionDTO): Promise<VersionModel> {
    return await this.commandBus.execute(new RemoveVersionCommand(data));
  }
}
