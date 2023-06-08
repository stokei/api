import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CompleteAccountConfigurationInput } from '@/controllers/graphql/inputs/accounts/complete-account-configuration.input';
import { Account } from '@/controllers/graphql/types/account';
import { AuthResponse } from '@/controllers/graphql/types/auth-response';
import { CompleteAccountConfigurationService } from '@/services/accounts/complete-account-configuration';

@Resolver(() => Account)
export class CompleteAccountConfigurationResolver {
  constructor(
    private readonly completeAccountConfigurationService: CompleteAccountConfigurationService
  ) {}

  @UseGuards(AppGuard)
  @Mutation(() => AuthResponse)
  async completeAccountConfiguration(
    @Args('input') data: CompleteAccountConfigurationInput,
    @CurrentApp('id') appId: string
  ) {
    const response = await this.completeAccountConfigurationService.execute({
      ...data,
      app: appId
    });
    return response;
  }
}
