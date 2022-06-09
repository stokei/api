import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';

import { CardModel } from '@/models/card.model';
import { FindCardByIdQuery } from '@/queries/implements/cards/find-card-by-id.query';

@Injectable()
export class FindCardByIdService
  implements IBaseService<string, Promise<CardModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<CardModel> {
    return await this.queryBus.execute(new FindCardByIdQuery(data));
  }
}
