import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { ForgotPasswordInput } from '@/controllers/graphql/inputs/accounts/forgot-password.input';
import { Account } from '@/controllers/graphql/types/account';
import { ForgotPasswordService } from '@/services/accounts/forgot-password';

@Resolver(() => Account)
export class ForgotPasswordResolver {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Account)
  async forgotPassword(@Args('input') data: ForgotPasswordInput) {
    const response = await this.forgotPasswordService.execute(data);
    return response;
  }
}
