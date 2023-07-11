import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateFeatureInput } from '@/controllers/graphql/inputs/features/create-feature.input';
import { Feature } from '@/controllers/graphql/types/feature';
import { CreateFeatureService } from '@/services/features/create-feature';

@Resolver(() => Feature)
export class CreateFeatureResolver {
  constructor(private readonly createFeatureService: CreateFeatureService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Feature)
  async createFeature(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateFeatureInput
  ) {
    const response = await this.createFeatureService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
