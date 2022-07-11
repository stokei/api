import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveModuleVideoCommand } from '@/commands/implements/module-videos/remove-module-video.command';
import { RemoveModuleVideoDTO } from '@/dtos/module-videos/remove-module-video.dto';
import { ModuleVideoModel } from '@/models/module-video.model';

@Injectable()
export class RemoveModuleVideoService
  implements IBaseService<RemoveModuleVideoDTO, Promise<ModuleVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveModuleVideoDTO): Promise<ModuleVideoModel> {
    return await this.commandBus.execute(new RemoveModuleVideoCommand(data));
  }
}
