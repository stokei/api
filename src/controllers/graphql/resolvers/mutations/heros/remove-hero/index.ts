import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { RemoveHeroInput } from '@/controllers/graphql/inputs/heros/remove-hero.input';
import { Hero } from '@/controllers/graphql/types/hero';
import { RemoveHeroService } from '@/services/heros/remove-hero';

@Resolver(() => Hero)
export class RemoveHeroResolver {
  constructor(private readonly removeHeroService: RemoveHeroService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Hero)
  async removeHero(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveHeroInput
  ) {
    const response = await this.removeHeroService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
