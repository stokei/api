import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CreateCardCommand } from '@/commands/implements/cards/create-card.command';
import { CreateCardDTO } from '@/dtos/cards/create-card.dto';
import { CardModel } from '@/models/card.model';

@Injectable()
export class CreateCardService
  implements IBaseService<CreateCardDTO, Promise<CardModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: CreateCardDTO): Promise<CardModel> {
    return await this.commandBus.execute(new CreateCardCommand(data));
  }
}
