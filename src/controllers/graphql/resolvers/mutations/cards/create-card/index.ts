import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateCardInput } from '@/controllers/graphql/inputs/cards/create-card.input';
import { Card } from '@/controllers/graphql/types/card';
import { CreateCardService } from '@/services/cards/create-card';

@Resolver(() => Card)
export class CreateCardResolver {
  constructor(private readonly createCardService: CreateCardService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Card)
  async createCard(
    @Args('input') data: CreateCardInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createCardService.execute(data);
    return response;
  }
}
