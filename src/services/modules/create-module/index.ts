import { CreateModuleCommand } from '@/commands/implements/modules/create-module.command';
import { CreateModuleDTO } from '@/dtos/modules/create-module.dto';
import { ModuleModel } from '@/models/module.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class CreateModuleService
  implements IBaseService<CreateModuleDTO, Promise<ModuleModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateModuleDTO): Promise<ModuleModel> {
    return await this.commandBus.execute(new CreateModuleCommand(data));
  }
}
