import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllColorsInput,
  WhereDataFindAllColorsInput
} from '@/controllers/graphql/inputs/colors/find-all-colors.input';
import { Color } from '@/controllers/graphql/types/color';
import { Colors } from '@/controllers/graphql/types/colors';
import { FindAllColorsService } from '@/services/colors/find-all-colors';

@Resolver(() => Color)
export class ColorsResolver {
  constructor(private readonly findAllColorsService: FindAllColorsService) {}

  @Query(() => Colors)
  async colors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllColorsInput, nullable: true })
    where: WhereDataFindAllColorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllColorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllColorsInput
  ) {
    return await this.findAllColorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
