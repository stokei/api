import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateSiteInput } from '@/controllers/graphql/inputs/sites/update-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { UpdateSiteService } from '@/services/sites/update-site';

@Resolver(() => Site)
export class UpdateSiteResolver {
  constructor(private readonly updateSiteService: UpdateSiteService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Site)
  async updateSite(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateSiteInput
  ) {
    const response = await this.updateSiteService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
