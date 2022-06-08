import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllRatingsInput,
  WhereDataFindAllRatingsInput
} from '@/controllers/graphql/inputs/ratings/find-all-ratings.input';
import { Rating } from '@/controllers/graphql/types/rating';
import { Ratings } from '@/controllers/graphql/types/ratings';
import { FindAllRatingsService } from '@/services/ratings/find-all-ratings';

@Resolver(() => Rating)
export class RatingsResolver {
  constructor(private readonly findAllRatingsService: FindAllRatingsService) {}

  @Query(() => Ratings)
  async ratings(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllRatingsInput, nullable: true })
    where: WhereDataFindAllRatingsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllRatingsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllRatingsInput
  ) {
    return await this.findAllRatingsService.execute({
      page,
      where,
      orderBy
    });
  }
}
