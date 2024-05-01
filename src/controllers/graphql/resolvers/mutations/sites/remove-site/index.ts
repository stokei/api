import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveSiteInput } from '@/controllers/graphql/inputs/sites/remove-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { RemoveSiteService } from '@/services/sites/remove-site';

@Resolver(() => Site)
export class RemoveSiteResolver {
  constructor(private readonly removeSiteService: RemoveSiteService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Site)
  async removeSite(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveSiteInput
  ) {
    const response = await this.removeSiteService.execute({
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
