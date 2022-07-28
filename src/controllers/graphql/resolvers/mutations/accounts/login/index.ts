import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { LoginInput } from '@/controllers/graphql/inputs/accounts/login.input';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { LoginService } from '@/services/accounts/login';

@Resolver(() => MeAccount)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(AppGuard)
  @Mutation(() => AuthResponse)
  async login(
    @Args('input') data: LoginInput,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.loginService.execute({ ...data, app: appId });
    return response;
  }
}
