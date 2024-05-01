import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CloneComponentsTreeCommand } from '@/commands/implements/components/clone-components-tree.command';
import { CloneComponentsTreeDTO } from '@/dtos/components/clone-components-tree.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class CloneComponentsTreeService
  implements IBaseService<CloneComponentsTreeDTO, Promise<ComponentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CloneComponentsTreeDTO): Promise<ComponentModel> {
    return await this.commandBus.execute(new CloneComponentsTreeCommand(data));
  }
}
