import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateMaterialCommand } from '@/commands/implements/materials/update-material.command';
import { UpdateMaterialDTO } from '@/dtos/materials/update-material.dto';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class UpdateMaterialService
  implements IBaseService<UpdateMaterialDTO, Promise<MaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateMaterialDTO): Promise<MaterialModel> {
    return await this.commandBus.execute(new UpdateMaterialCommand(data));
  }
}
