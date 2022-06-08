import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveVideosAuthorInput } from '@/controllers/graphql/inputs/videos-authors/remove-videos-author.input';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import { RemoveVideosAuthorService } from '@/services/videos-authors/remove-videos-author';

@Resolver(() => VideosAuthor)
export class RemoveVideosAuthorResolver {
  constructor(
    private readonly removeVideosAuthorService: RemoveVideosAuthorService
  ) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => VideosAuthor)
  async removeVideosAuthor(
    @Args('input') data: RemoveVideosAuthorInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVideosAuthorService.execute(data);
    return response;
  }
}
