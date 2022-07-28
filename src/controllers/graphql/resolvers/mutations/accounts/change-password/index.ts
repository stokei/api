import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ChangePasswordInput } from '@/controllers/graphql/inputs/accounts/change-password.input';
import { Account } from '@/controllers/graphql/types/account';
import { ChangePasswordService } from '@/services/accounts/change-password';

@Resolver(() => Account)
export class ChangePasswordResolver {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @UseGuards(AppGuard)
  @Mutation(() => Boolean)
  async changePassword(
    @Args('input') data: ChangePasswordInput,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.changePasswordService.execute({
      ...data,
      app: appId
    });
    return response;
  }
}
