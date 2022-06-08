import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllSitesDarkColorsInput,
  WhereDataFindAllSitesDarkColorsInput
} from '@/controllers/graphql/inputs/sites-dark-colors/find-all-sites-dark-colors.input';
import { SitesDarkColor } from '@/controllers/graphql/types/sites-dark-color';
import { SitesDarkColors } from '@/controllers/graphql/types/sites-dark-colors';
import { FindAllSitesDarkColorsService } from '@/services/sites-dark-colors/find-all-sites-dark-colors';

@Resolver(() => SitesDarkColor)
export class SitesDarkColorsResolver {
  constructor(
    private readonly findAllSitesDarkColorsService: FindAllSitesDarkColorsService
  ) {}

  @Query(() => SitesDarkColors)
  async sitesDarkColors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSitesDarkColorsInput,
      nullable: true
    })
    where: WhereDataFindAllSitesDarkColorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSitesDarkColorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSitesDarkColorsInput
  ) {
    return await this.findAllSitesDarkColorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
