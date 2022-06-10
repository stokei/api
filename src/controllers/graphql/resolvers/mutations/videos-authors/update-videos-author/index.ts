import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateVideosAuthorInput } from '@/controllers/graphql/inputs/videos-authors/update-videos-author.input';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import { UpdateVideosAuthorService } from '@/services/videos-authors/update-videos-author';

@Resolver(() => VideosAuthor)
export class UpdateVideosAuthorResolver {
  constructor(
    private readonly updateVideosAuthorService: UpdateVideosAuthorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideosAuthor)
  async updateVideosAuthor(@Args('input') data: UpdateVideosAuthorInput) {
    const response = await this.updateVideosAuthorService.execute(data);
    return response;
  }
}
