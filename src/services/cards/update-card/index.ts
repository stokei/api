import { UpdateCardCommand } from '@/commands/implements/cards/update-card.command';
import { UpdateCardDTO } from '@/dtos/cards/update-card.dto';
import { CardModel } from '@/models/card.model';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

@Injectable()
export class UpdateCardService
  implements IBaseService<UpdateCardDTO, Promise<CardModel>>
{
  constructor(private readonly commandBus: CommandBus) {}

  async execute(data: UpdateCardDTO): Promise<CardModel> {
    return await this.commandBus.execute(new UpdateCardCommand(data));
  }
}
