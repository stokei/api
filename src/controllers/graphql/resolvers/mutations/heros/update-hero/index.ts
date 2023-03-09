import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateHeroInput } from '@/controllers/graphql/inputs/heros/update-hero.input';
import { Hero } from '@/controllers/graphql/types/hero';
import { UpdateHeroService } from '@/services/heros/update-hero';

@Resolver(() => Hero)
export class UpdateHeroResolver {
  constructor(private readonly updateHeroService: UpdateHeroService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Hero)
  async updateHero(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateHeroInput
  ) {
    const response = await this.updateHeroService.execute({
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
