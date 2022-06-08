import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { CreateVideosTagInput } from '@/controllers/graphql/inputs/videos-tags/create-videos-tag.input';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';
import { CreateVideosTagService } from '@/services/videos-tags/create-videos-tag';

@Resolver(() => VideosTag)
export class CreateVideosTagResolver {
  constructor(
    private readonly createVideosTagService: CreateVideosTagService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosTag)
  async createVideosTag(
    @Args('input') data: CreateVideosTagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createVideosTagService.execute(data);
    return response;
  }
}
