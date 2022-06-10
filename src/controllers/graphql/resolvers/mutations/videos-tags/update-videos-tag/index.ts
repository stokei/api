import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateVideosTagInput } from '@/controllers/graphql/inputs/videos-tags/update-videos-tag.input';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';
import { UpdateVideosTagService } from '@/services/videos-tags/update-videos-tag';

@Resolver(() => VideosTag)
export class UpdateVideosTagResolver {
  constructor(
    private readonly updateVideosTagService: UpdateVideosTagService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideosTag)
  async updateVideosTag(@Args('input') data: UpdateVideosTagInput) {
    const response = await this.updateVideosTagService.execute(data);
    return response;
  }
}
