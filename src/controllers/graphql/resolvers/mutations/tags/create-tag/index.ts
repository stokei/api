import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateTagInput } from '@/controllers/graphql/inputs/tags/create-tag.input';
import { Tag } from '@/controllers/graphql/types/tag';
import { CreateTagService } from '@/services/tags/create-tag';

@Resolver(() => Tag)
export class CreateTagResolver {
  constructor(private readonly createTagService: CreateTagService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Tag)
  async createTag(@Args('input') data: CreateTagInput) {
    const response = await this.createTagService.execute(data);
    return response;
  }
}
