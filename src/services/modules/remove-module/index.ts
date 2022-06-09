import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveModuleCommand } from '@/commands/implements/modules/remove-module.command';
import { RemoveModuleDTO } from '@/dtos/modules/remove-module.dto';
import { ModuleModel } from '@/models/module.model';

@Injectable()
export class RemoveModuleService
  implements IBaseService<RemoveModuleDTO, Promise<ModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveModuleDTO): Promise<ModuleModel> {
    return await this.commandBus.execute(new RemoveModuleCommand(data));
  }
}
