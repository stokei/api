import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateComponentCommand } from '@/commands/implements/components/create-component.command';
import { CreateComponentDTO } from '@/dtos/components/create-component.dto';
import { ComponentModel } from '@/models/component.model';

@Injectable()
export class CreateComponentService
  implements IBaseService<CreateComponentDTO, Promise<ComponentModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateComponentDTO): Promise<ComponentModel> {
    return await this.commandBus.execute(new CreateComponentCommand(data));
  }
}
