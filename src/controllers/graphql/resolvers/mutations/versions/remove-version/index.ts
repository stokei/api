import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveVersionInput } from '@/controllers/graphql/inputs/versions/remove-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { RemoveVersionService } from '@/services/versions/remove-version';

@Resolver(() => Version)
export class RemoveVersionResolver {
  constructor(private readonly removeVersionService: RemoveVersionService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Version)
  async removeVersion(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveVersionInput
  ) {
    const response = await this.removeVersionService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
