import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllSitesLightColorsInput,
  WhereDataFindAllSitesLightColorsInput
} from '@/controllers/graphql/inputs/sites-light-colors/find-all-sites-light-colors.input';
import { SitesLightColor } from '@/controllers/graphql/types/sites-light-color';
import { SitesLightColors } from '@/controllers/graphql/types/sites-light-colors';
import { FindAllSitesLightColorsService } from '@/services/sites-light-colors/find-all-sites-light-colors';

@Resolver(() => SitesLightColor)
export class SitesLightColorsResolver {
  constructor(
    private readonly findAllSitesLightColorsService: FindAllSitesLightColorsService
  ) {}

  @Query(() => SitesLightColors)
  async sitesLightColors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllSitesLightColorsInput,
      nullable: true
    })
    where: WhereDataFindAllSitesLightColorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllSitesLightColorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllSitesLightColorsInput
  ) {
    return await this.findAllSitesLightColorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
