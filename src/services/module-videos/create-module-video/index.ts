import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateModuleVideoCommand } from '@/commands/implements/module-videos/create-module-video.command';
import { CreateModuleVideoDTO } from '@/dtos/module-videos/create-module-video.dto';
import { ModuleVideoModel } from '@/models/module-video.model';

@Injectable()
export class CreateModuleVideoService
  implements IBaseService<CreateModuleVideoDTO, Promise<ModuleVideoModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateModuleVideoDTO): Promise<ModuleVideoModel> {
    return await this.commandBus.execute(new CreateModuleVideoCommand(data));
  }
}
