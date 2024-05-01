import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveComponentCommand } from '@/commands/implements/components/remove-component.command';
import { RemoveComponentDTO } from '@/dtos/components/remove-component.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class RemoveComponentService
  implements IBaseService<RemoveComponentDTO, Promise<ComponentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveComponentDTO): Promise<ComponentModel> {
    return await this.commandBus.execute(new RemoveComponentCommand(data));
  }
}
