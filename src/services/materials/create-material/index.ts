import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateMaterialCommand } from '@/commands/implements/materials/create-material.command';
import { CreateMaterialDTO } from '@/dtos/materials/create-material.dto';
import { MaterialModel } from '@/models/material.model';

@Injectable()
export class CreateMaterialService
  implements IBaseService<CreateMaterialDTO, Promise<MaterialModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateMaterialDTO): Promise<MaterialModel> {
    return await this.commandBus.execute(new CreateMaterialCommand(data));
  }
}
