import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateComponentsOrderCommand } from '@/commands/implements/components/update-components-order.command';
import { UpdateComponentsOrderDTO } from '@/dtos/components/update-components-order.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class UpdateComponentsOrderService
  implements IBaseService<UpdateComponentsOrderDTO, Promise<ComponentModel[]>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateComponentsOrderDTO): Promise<ComponentModel[]> {
    return await this.commandBus.execute(
      new UpdateComponentsOrderCommand(data)
    );
  }
}
