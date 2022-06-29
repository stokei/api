import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveCardInput } from '@/controllers/graphql/inputs/cards/remove-card.input';
import { Card } from '@/controllers/graphql/types/card';
import { RemoveCardService } from '@/services/cards/remove-card';

@Resolver(() => Card)
export class RemoveCardResolver {
  constructor(private readonly removeCardService: RemoveCardService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Card)
  async removeCard(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveCardInput
  ) {
    const response = await this.removeCardService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
