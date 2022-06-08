import { SignUpInput } from '@/controllers/graphql/inputs/accounts/singup.input';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { MeAccount } from '@/controllers/graphql/types/me-account';
import { SignUpService } from '@/services/accounts/singup';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

@Resolver(() => MeAccount)
export class SignUpResolver {
  constructor(private readonly signUpService: SignUpService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig({
    isRequired: true
  })
  @Mutation(() => AuthResponse)
  async signUp(
    @Args('input') data: SignUpInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.signUpService.execute({
      ...data,
      parent: projectId
    });
    return response;
  }
}
