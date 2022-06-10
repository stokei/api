import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateCardInput } from '@/controllers/graphql/inputs/cards/create-card.input';
import { Card } from '@/controllers/graphql/types/card';
import { CreateCardService } from '@/services/cards/create-card';

@Resolver(() => Card)
export class CreateCardResolver {
  constructor(private readonly createCardService: CreateCardService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Card)
  async createCard(@Args('input') data: CreateCardInput) {
    const response = await this.createCardService.execute(data);
    return response;
  }
}
