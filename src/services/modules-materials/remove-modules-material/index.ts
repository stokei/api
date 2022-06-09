import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveModulesMaterialCommand } from '@/commands/implements/modules-materials/remove-modules-material.command';
import { RemoveModulesMaterialDTO } from '@/dtos/modules-materials/remove-modules-material.dto';
import { ModulesMaterialModel } from '@/models/modules-material.model';

@Injectable()
export class RemoveModulesMaterialService
  implements
    IBaseService<RemoveModulesMaterialDTO, Promise<ModulesMaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveModulesMaterialDTO): Promise<ModulesMaterialModel> {
    return await this.commandBus.execute(
      new RemoveModulesMaterialCommand(data)
    );
  }
}
