import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { RemoveCardCommand } from '@/commands/implements/cards/remove-card.command';
import { RemoveCardDTO } from '@/dtos/cards/remove-card.dto';
import { CardModel } from '@/models/card.model';

@Injectable()
export class RemoveCardService
  implements IBaseService<RemoveCardDTO, Promise<CardModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: RemoveCardDTO): Promise<CardModel> {
    return await this.commandBus.execute(new RemoveCardCommand(data));
  }
}
