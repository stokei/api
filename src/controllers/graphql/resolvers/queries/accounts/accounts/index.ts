import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllAccountsInput,
  WhereDataFindAllAccountsInput
} from '@/controllers/graphql/inputs/accounts/find-all-accounts.input';
import { Account } from '@/controllers/graphql/types/account';
import { Accounts } from '@/controllers/graphql/types/accounts';
import { FindAllAccountsService } from '@/services/accounts/find-all-accounts';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private readonly findAllAccountsService: FindAllAccountsService
  ) {}

  @Query(() => Accounts)
  async accounts(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllAccountsInput,
      nullable: true
    })
    where: WhereDataFindAllAccountsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAccountsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAccountsInput
  ) {
    return await this.findAllAccountsService.execute({
      page,
      where,
      orderBy
    });
  }
}
