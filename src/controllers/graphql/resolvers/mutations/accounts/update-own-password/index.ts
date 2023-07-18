import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Account } from '@/controllers/graphql/types/account';
import { UpdateOwnPasswordService } from '@/services/accounts/update-own-password';

@Resolver(() => Account)
export class UpdateOwnPasswordResolver {
  constructor(
    private readonly updateOwnPasswordService: UpdateOwnPasswordService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Boolean)
  async updateOwnPassword(
    @CurrentApp('id') appId: string,
    @CurrentAccount('id') accountId: string
  ) {
    const response = await this.updateOwnPasswordService.execute({
      account: accountId,
      app: appId
    });
    return response;
  }
}
