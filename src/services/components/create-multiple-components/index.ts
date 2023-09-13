import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateMultipleComponentsCommand } from '@/commands/implements/components/create-multiple-components.command';
import { CreateMultipleComponentsDTO } from '@/dtos/components/create-multiple-components.dto';

@Injectable()
export class CreateMultipleComponentsService
  implements IBaseService<CreateMultipleComponentsDTO, Promise<boolean>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateMultipleComponentsDTO): Promise<boolean> {
    return await this.commandBus.execute(
      new CreateMultipleComponentsCommand(data)
    );
  }
}
