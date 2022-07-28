import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { ForgotPasswordInput } from '@/controllers/graphql/inputs/accounts/forgot-password.input';
import { Account } from '@/controllers/graphql/types/account';
import { ForgotPasswordService } from '@/services/accounts/forgot-password';

@Resolver(() => Account)
export class ForgotPasswordResolver {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @UseGuards(AppGuard)
  @Mutation(() => Boolean)
  async forgotPassword(
    @Args('input') data: ForgotPasswordInput,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.forgotPasswordService.execute({
      ...data,
      app: appId
    });
    return response;
  }
}
