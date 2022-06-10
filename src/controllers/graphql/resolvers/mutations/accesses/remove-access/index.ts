import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  AuthenticatedGuard,
  CurrentAccount,
  IAuthenticatedAccount
} from '@stokei/nestjs';

import { RemoveAccessInput } from '@/controllers/graphql/inputs/accesses/remove-access.input';
import { Access } from '@/controllers/graphql/types/access';
import { RemoveAccessService } from '@/services/accesses/remove-access';

@Resolver(() => Access)
export class RemoveAccessResolver {
  constructor(private readonly removeAccessService: RemoveAccessService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Access)
  async removeAccess(
    @Args('input') data: RemoveAccessInput,
    @CurrentAccount() currentAccount: IAuthenticatedAccount
  ) {
    const response = await this.removeAccessService.execute({
      ...data,
      where: {
        ...data?.where,
        accountId: currentAccount.id
      }
    });
    return response;
  }
}
