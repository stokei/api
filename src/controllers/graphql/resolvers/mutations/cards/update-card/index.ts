import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateCardInput } from '@/controllers/graphql/inputs/cards/update-card.input';
import { Card } from '@/controllers/graphql/types/card';
import { UpdateCardService } from '@/services/cards/update-card';

@Resolver(() => Card)
export class UpdateCardResolver {
  constructor(private readonly updateCardService: UpdateCardService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Card)
  async updateCard(@Args('input') data: UpdateCardInput) {
    const response = await this.updateCardService.execute(data);
    return response;
  }
}
