import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateComponentsTreeCommand } from '@/commands/implements/components/create-components-tree.command';
import { CreateComponentsTreeDTO } from '@/dtos/components/create-components-tree.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class CreateComponentsTreeService
  implements IBaseService<CreateComponentsTreeDTO, Promise<ComponentModel[]>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateComponentsTreeDTO): Promise<ComponentModel[]> {
    return await this.commandBus.execute(new CreateComponentsTreeCommand(data));
  }
}
