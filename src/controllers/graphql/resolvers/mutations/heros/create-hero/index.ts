import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppConfig } from '@/common/decorators/app-config.decorator';
import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateHeroInput } from '@/controllers/graphql/inputs/heros/create-hero.input';
import { Hero } from '@/controllers/graphql/types/hero';
import { CreateHeroService } from '@/services/heros/create-hero';

@Resolver(() => Hero)
export class CreateHeroResolver {
  constructor(private readonly createHeroService: CreateHeroService) {}

  @AppConfig({
    isAllowedToUsePlan: true,
    isRequired: true
  })
  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Hero)
  async createHero(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateHeroInput
  ) {
    const response = await this.createHeroService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
