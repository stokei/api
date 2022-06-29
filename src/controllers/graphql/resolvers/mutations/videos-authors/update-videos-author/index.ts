import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

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
  async updateVideosAuthor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateVideosAuthorInput
  ) {
    const response = await this.updateVideosAuthorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
