import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { UpdateComponentCommand } from '@/commands/implements/components/update-component.command';
import { UpdateComponentDTO } from '@/dtos/components/update-component.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class UpdateComponentService
  implements IBaseService<UpdateComponentDTO, Promise<ComponentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateComponentDTO): Promise<ComponentModel> {
    return await this.commandBus.execute(new UpdateComponentCommand(data));
  }
}
