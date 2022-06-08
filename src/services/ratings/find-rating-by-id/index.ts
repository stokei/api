import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService } from '@stokei/nestjs';
import { RatingModel } from '@/models/rating.model';
import { FindRatingByIdQuery } from '@/queries/implements/ratings/find-rating-by-id.query';

@Injectable()
export class FindRatingByIdService
  implements IBaseService<string, Promise<RatingModel>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: string): Promise<RatingModel> {
    return await this.queryBus.execute(new FindRatingByIdQuery(data));
  }
}
