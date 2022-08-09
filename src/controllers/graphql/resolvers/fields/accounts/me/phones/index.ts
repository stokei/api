import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllPhonesInput } from '@/controllers/graphql/inputs/phones/find-all-phones.input';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { Phones } from '@/controllers/graphql/types/phones';
import { AccountModel } from '@/models/account.model';
import { FindAllPhonesService } from '@/services/phones/find-all-phones';

@Resolver(() => MeAccount)
export class MeAccountPhonesResolver {
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
    @Parent() account: AccountModel
  ) {
    return this.findAllPhonesService.execute({
      page,
      orderBy,
      where: {
        AND: {
          parent: {
            equals: account.id
          }
        }
      }
    });
  }
}
