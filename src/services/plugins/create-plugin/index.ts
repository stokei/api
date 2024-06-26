import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreatePluginCommand } from '@/commands/implements/plugins/create-plugin.command';
import { CreatePluginDTO } from '@/dtos/plugins/create-plugin.dto';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class CreatePluginService
  implements IBaseService<CreatePluginDTO, Promise<PluginModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreatePluginDTO): Promise<PluginModel> {
    return await this.commandBus.execute(new CreatePluginCommand(data));
  }
}
