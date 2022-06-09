import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateAccountInput } from '@/controllers/graphql/inputs/accounts/update-account.input';
import { Account } from '@/controllers/graphql/types/account';
import { UpdateAccountService } from '@/services/accounts/update-account';

@Resolver(() => Account)
export class UpdateAccountResolver {
  constructor(private readonly updateAccountService: UpdateAccountService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Account)
  async updateAccount(
    @Args('input') data: UpdateAccountInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateAccountService.execute(data);
    return response;
  }
}
