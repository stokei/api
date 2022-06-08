import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateTagInput } from '@/controllers/graphql/inputs/tags/update-tag.input';
import { Tag } from '@/controllers/graphql/types/tag';
import { UpdateTagService } from '@/services/tags/update-tag';

@Resolver(() => Tag)
export class UpdateTagResolver {
  constructor(private readonly updateTagService: UpdateTagService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Tag)
  async updateTag(
    @Args('input') data: UpdateTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateTagService.execute(data);
    return response;
  }
}
