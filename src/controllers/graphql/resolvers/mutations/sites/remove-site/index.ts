import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveSiteInput } from '@/controllers/graphql/inputs/sites/remove-site.input';
import { Site } from '@/controllers/graphql/types/site';
import { RemoveSiteService } from '@/services/sites/remove-site';

@Resolver(() => Site)
export class RemoveSiteResolver {
  constructor(private readonly removeSiteService: RemoveSiteService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Site)
  async removeSite(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveSiteInput
  ) {
    const response = await this.removeSiteService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
