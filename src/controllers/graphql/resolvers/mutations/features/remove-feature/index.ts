import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppConfig } from '@/common/decorators/app-config.decorator';
import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveFeatureInput } from '@/controllers/graphql/inputs/features/remove-feature.input';
import { Feature } from '@/controllers/graphql/types/feature';
import { RemoveFeatureService } from '@/services/features/remove-feature';

@Resolver(() => Feature)
export class RemoveFeatureResolver {
  constructor(private readonly removeFeatureService: RemoveFeatureService) {}

  @AppConfig({
    isAllowedToUsePlan: true,
    isRequired: true
  })
  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Feature)
  async removeFeature(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveFeatureInput
  ) {
    const response = await this.removeFeatureService.execute({
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
