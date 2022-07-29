import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { SignUpInput } from '@/controllers/graphql/inputs/accounts/signup.input';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { SignUpService } from '@/services/accounts/signup';

@Resolver(() => MeAccount)
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @UseGuards(AppGuard)
  @Mutation(() => AuthResponse)
  async signUp(
    @Args('input') data: SignUpInput,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.signUpService.execute({ ...data, app: appId });
    return response;
  }
}
