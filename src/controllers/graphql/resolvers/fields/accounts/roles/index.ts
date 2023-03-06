import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllRolesInput } from '@/controllers/graphql/inputs/roles/find-all-roles.input';
import { Account } from '@/controllers/graphql/types/account';
import { Roles } from '@/controllers/graphql/types/roles';
import { AccountModel } from '@/models/account.model';
import { FindAllRolesService } from '@/services/roles/find-all-roles';

@Resolver(() => Account)
export class AccountRolesResolver {
  constructor(private readonly findAllRolesService: FindAllRolesService) {}

  @ResolveField(() => Roles, { nullable: true })
  roles(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllRolesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllRolesInput,
    @Parent() account: AccountModel
  ) {
    return this.findAllRolesService.execute({
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
