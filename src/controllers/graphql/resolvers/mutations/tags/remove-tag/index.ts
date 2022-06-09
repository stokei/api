import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveTagInput } from '@/controllers/graphql/inputs/tags/remove-tag.input';
import { Tag } from '@/controllers/graphql/types/tag';
import { RemoveTagService } from '@/services/tags/remove-tag';

@Resolver(() => Tag)
export class RemoveTagResolver {
  constructor(private readonly removeTagService: RemoveTagService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Tag)
  async removeTag(
    @Args('input') data: RemoveTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeTagService.execute(data);
    return response;
  }
}
