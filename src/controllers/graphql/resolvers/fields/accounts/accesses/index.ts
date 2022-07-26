import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllAccessesInput } from '@/controllers/graphql/inputs/accesses/find-all-accesses.input';
import { Accesses } from '@/controllers/graphql/types/accesses';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { AccountModel } from '@/models/account.model';
import { FindAllAccessesService } from '@/services/accesses/find-all-accesses';

@Resolver(() => MeAccount)
export class MeAccountAccessesResolver {
  constructor(
    private readonly findAllAccessesService: FindAllAccessesService
  ) {}

  @ResolveField(() => Accesses)
  accesses(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAccessesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAccessesInput,
    @Parent() account: AccountModel
  ) {
    return this.findAllAccessesService.execute({
      page,
      orderBy,
      where: {
        AND: {
          app: {
            equals: account.id
          }
        }
      }
    });
  }
}
