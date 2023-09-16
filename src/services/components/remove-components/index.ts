import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveComponentsCommand } from '@/commands/implements/components/remove-components.command';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class RemoveComponentsService
  implements IBaseService<string[], Promise<ComponentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(ids: string[]): Promise<ComponentModel> {
    return await this.commandBus.execute(new RemoveComponentsCommand(ids));
  }
}
