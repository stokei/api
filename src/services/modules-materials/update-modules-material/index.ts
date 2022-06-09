import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateModulesMaterialCommand } from '@/commands/implements/modules-materials/update-modules-material.command';
import { UpdateModulesMaterialDTO } from '@/dtos/modules-materials/update-modules-material.dto';
import { ModulesMaterialModel } from '@/models/modules-material.model';

@Injectable()
export class UpdateModulesMaterialService
  implements
    IBaseService<UpdateModulesMaterialDTO, Promise<ModulesMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateModulesMaterialDTO): Promise<ModulesMaterialModel> {
    return await this.commandBus.execute(
      new UpdateModulesMaterialCommand(data)
    );
  }
}
