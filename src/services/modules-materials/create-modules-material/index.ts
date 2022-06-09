import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateModulesMaterialCommand } from '@/commands/implements/modules-materials/create-modules-material.command';
import { CreateModulesMaterialDTO } from '@/dtos/modules-materials/create-modules-material.dto';
import { ModulesMaterialModel } from '@/models/modules-material.model';

@Injectable()
export class CreateModulesMaterialService
  implements
    IBaseService<CreateModulesMaterialDTO, Promise<ModulesMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateModulesMaterialDTO): Promise<ModulesMaterialModel> {
    return await this.commandBus.execute(
      new CreateModulesMaterialCommand(data)
    );
  }
}
