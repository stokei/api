import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { cleanValue, splitServiceId } from '@stokei/nestjs';

import {
  DataNotFoundException,
  ParamNotFoundException,
  RatingNotFoundException
} from '@/errors';
import { RatingModel } from '@/models/rating.model';
import { FindRatingByIdQuery } from '@/queries/implements/ratings/find-rating-by-id.query';
import { FindRatingByIdRepository } from '@/repositories/ratings/find-rating-by-id';

@QueryHandler(FindRatingByIdQuery)
export class FindRatingByIdQueryHandler
  implements IQueryHandler<FindRatingByIdQuery>
{
  constructor(
    private readonly findRatingByIdRepository: FindRatingByIdRepository
  ) {}

  async execute(query: FindRatingByIdQuery): Promise<RatingModel> {
    if (!query) {
      throw new DataNotFoundException();
    }

    const id = cleanValue(splitServiceId(query.id)?.id);
    if (!id) {
      throw new ParamNotFoundException('id');
    }

    const rating = await this.findRatingByIdRepository.execute(id);
    if (!rating) {
      throw new RatingNotFoundException();
    }
    return rating;
  }
}
