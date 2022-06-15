import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePasswordInput } from '@/controllers/graphql/inputs/accounts/change-password.input';
import { Account } from '@/controllers/graphql/types/account';
import { ChangePasswordService } from '@/services/accounts/change-password';

@Resolver(() => Account)
export class ChangePasswordResolver {
  constructor(private readonly changePasswordService: ChangePasswordService) {}

  @Mutation(() => Boolean)
  async changePassword(@Args('input') data: ChangePasswordInput) {
    const response = await this.changePasswordService.execute(data);
    return response;
  }
}
