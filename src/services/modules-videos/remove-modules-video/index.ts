import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveModulesVideoCommand } from '@/commands/implements/modules-videos/remove-modules-video.command';
import { RemoveModulesVideoDTO } from '@/dtos/modules-videos/remove-modules-video.dto';
import { ModulesVideoModel } from '@/models/modules-video.model';

@Injectable()
export class RemoveModulesVideoService
  implements IBaseService<RemoveModulesVideoDTO, Promise<ModulesVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveModulesVideoDTO): Promise<ModulesVideoModel> {
    return await this.commandBus.execute(new RemoveModulesVideoCommand(data));
  }
}
