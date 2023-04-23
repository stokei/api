import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllColorsInput } from '@/controllers/graphql/inputs/colors/find-all-colors.input';
import { App } from '@/controllers/graphql/types/app';
import { Colors } from '@/controllers/graphql/types/colors';
import { AppModel } from '@/models/app.model';
import { FindAllColorsService } from '@/services/colors/find-all-colors';

@Resolver(() => App)
export class AppColorsResolver {
  constructor(private readonly findAllColorsService: FindAllColorsService) {}

  @ResolveField(() => Colors, { nullable: true })
  colors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllColorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllColorsInput,
    @Parent() app: AppModel
  ) {
    return this.findAllColorsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: app.id
          }
        }
      }
    });
  }
}
