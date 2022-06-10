import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { LoginInput } from '@/controllers/graphql/inputs/accounts/login.input';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { LoginService } from '@/services/accounts/login';

@Resolver(() => MeAccount)
export class LoginResolver {
  constructor(private readonly loginService: LoginService) {}

  @Mutation(() => AuthResponse)
  async login(@Args('input') data: LoginInput) {
    const response = await this.loginService.execute(data);
    return response;
  }
}
