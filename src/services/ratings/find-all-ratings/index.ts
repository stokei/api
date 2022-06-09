import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IBaseService, IPaginatedType } from '@stokei/nestjs';

import { FindAllRatingsDTO } from '@/dtos/ratings/find-all-ratings.dto';
import { RatingModel } from '@/models/rating.model';
import { FindAllRatingsQuery } from '@/queries/implements/ratings/find-all-ratings.query';

@Injectable()
export class FindAllRatingsService
  implements
    IBaseService<FindAllRatingsDTO, Promise<IPaginatedType<RatingModel>>>
{
  constructor(private readonly queryBus: QueryBus) {}

  async execute(data: FindAllRatingsDTO): Promise<IPaginatedType<RatingModel>> {
    return await this.queryBus.execute(new FindAllRatingsQuery(data));
  }
}
