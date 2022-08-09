import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPhonesInput } from '@/controllers/graphql/inputs/phones/find-all-phones.input';
import { App } from '@/controllers/graphql/types/app';
import { Phones } from '@/controllers/graphql/types/phones';
import { AppModel } from '@/models/app.model';
import { FindAllPhonesService } from '@/services/phones/find-all-phones';

@Resolver(() => App)
export class AppPhonesResolver {
  constructor(private readonly findAllPhonesService: FindAllPhonesService) {}

  @ResolveField(() => Phones, { nullable: true })
  phones(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllPhonesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllPhonesInput,
    @Parent() app: AppModel
  ) {
    return this.findAllPhonesService.execute({
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
