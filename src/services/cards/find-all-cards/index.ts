import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';
import { CardModel } from '@/models/card.model';
import { FindAllCardsDTO } from '@/dtos/cards/find-all-cards.dto';
import { FindAllCardsQuery } from '@/queries/implements/cards/find-all-cards.query';

@Injectable()
export class FindAllCardsService
  implements IBaseService<FindAllCardsDTO, Promise<IPaginatedType<CardModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllCardsDTO): Promise<IPaginatedType<CardModel>> {
    return await this.queryBus.execute(new FindAllCardsQuery(data));
  }
}
