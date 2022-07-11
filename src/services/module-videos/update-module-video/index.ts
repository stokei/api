import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateModuleVideoCommand } from '@/commands/implements/module-videos/update-module-video.command';
import { UpdateModuleVideoDTO } from '@/dtos/module-videos/update-module-video.dto';
import { ModuleVideoModel } from '@/models/module-video.model';

@Injectable()
export class UpdateModuleVideoService
  implements IBaseService<UpdateModuleVideoDTO, Promise<ModuleVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateModuleVideoDTO): Promise<ModuleVideoModel> {
    return await this.commandBus.execute(new UpdateModuleVideoCommand(data));
  }
}
