import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdatePluginCommand } from '@/commands/implements/plugins/update-plugin.command';
import { UpdatePluginDTO } from '@/dtos/plugins/update-plugin.dto';
import { PluginModel } from '@/models/plugin.model';

@Injectable()
export class UpdatePluginService
  implements IBaseService<UpdatePluginDTO, Promise<PluginModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdatePluginDTO): Promise<PluginModel> {
    return await this.commandBus.execute(new UpdatePluginCommand(data));
  }
}
