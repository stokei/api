import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateVideosAuthorInput } from '@/controllers/graphql/inputs/videos-authors/create-videos-author.input';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import { CreateVideosAuthorService } from '@/services/videos-authors/create-videos-author';

@Resolver(() => VideosAuthor)
export class CreateVideosAuthorResolver {
  constructor(
    private readonly createVideosAuthorService: CreateVideosAuthorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideosAuthor)
  async createVideosAuthor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateVideosAuthorInput
  ) {
    const response = await this.createVideosAuthorService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
