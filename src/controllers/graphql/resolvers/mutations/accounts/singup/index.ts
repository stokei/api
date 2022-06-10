import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpInput } from '@/controllers/graphql/inputs/accounts/singup.input';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { SignUpService } from '@/services/accounts/singup';

@Resolver(() => MeAccount)
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @Mutation(() => AuthResponse)
  async signUp(@Args('input') data: SignUpInput) {
    const response = await this.signUpService.execute(data);
    return response;
  }
}
