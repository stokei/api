import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';
import {
  CardNotFoundException,
  DataNotFoundException,
  ParamNotFoundException
} from '@/errors';
import { CardModel } from '@/models/card.model';
import { FindCardByIdRepository } from '@/repositories/cards/find-card-by-id';
import { FindCardByIdQuery } from '@/queries/implements/cards/find-card-by-id.query';

@QueryHandler(FindCardByIdQuery)
export class FindCardByIdQueryHandler
  implements IQueryHandler<FindCardByIdQuery>
{
  constructor(
    private readonly findCardByIdRepository: FindCardByIdRepository
  ) {}

  async execute(query: FindCardByIdQuery): Promise<CardModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const card = await this.findCardByIdRepository.execute(id);
    if (!card) {
      throw new CardNotFoundException();
    }
    return card;
  }
}
