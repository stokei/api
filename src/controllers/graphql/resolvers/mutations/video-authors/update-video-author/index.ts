import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateVideoAuthorInput } from '@/controllers/graphql/inputs/video-authors/update-video-author.input';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { UpdateVideoAuthorService } from '@/services/video-authors/update-video-author';

@Resolver(() => VideoAuthor)
export class UpdateVideoAuthorResolver {
  constructor(
    private readonly updateVideoAuthorService: UpdateVideoAuthorService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => VideoAuthor)
  async updateVideoAuthor(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateVideoAuthorInput
  ) {
    const response = await this.updateVideoAuthorService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
