import { UpdateModuleCommand } from '@/commands/implements/modules/update-module.command';
import { UpdateModuleDTO } from '@/dtos/modules/update-module.dto';
import { ModuleModel } from '@/models/module.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateModuleService
  implements IBaseService<UpdateModuleDTO, Promise<ModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateModuleDTO): Promise<ModuleModel> {
    return await this.commandBus.execute(new UpdateModuleCommand(data));
  }
}
