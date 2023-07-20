import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveMaterialCommand } from '@/commands/implements/materials/remove-material.command';
import { RemoveMaterialDTO } from '@/dtos/materials/remove-material.dto';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class RemoveMaterialService
  implements IBaseService<RemoveMaterialDTO, Promise<MaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveMaterialDTO): Promise<MaterialModel> {
    return await this.commandBus.execute(new RemoveMaterialCommand(data));
  }
}
