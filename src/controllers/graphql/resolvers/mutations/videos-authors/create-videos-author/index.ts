import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateVideosAuthorInput } from '@/controllers/graphql/inputs/videos-authors/create-videos-author.input';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import { CreateVideosAuthorService } from '@/services/videos-authors/create-videos-author';

@Resolver(() => VideosAuthor)
export class CreateVideosAuthorResolver {
  constructor(
    private readonly createVideosAuthorService: CreateVideosAuthorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosAuthor)
  async createVideosAuthor(
    @Args('input') data: CreateVideosAuthorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createVideosAuthorService.execute(data);
    return response;
  }
}
