import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveCardInput } from '@/controllers/graphql/inputs/cards/remove-card.input';
import { Card } from '@/controllers/graphql/types/card';
import { RemoveCardService } from '@/services/cards/remove-card';

@Resolver(() => Card)
export class RemoveCardResolver {
  constructor(private readonly removeCardService: RemoveCardService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Card)
  async removeCard(
    @Args('input') data: RemoveCardInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeCardService.execute(data);
    return response;
  }
}
