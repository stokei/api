import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateVideoAuthorInput } from '@/controllers/graphql/inputs/video-authors/create-video-author.input';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { CreateVideoAuthorService } from '@/services/video-authors/create-video-author';

@Resolver(() => VideoAuthor)
export class CreateVideoAuthorResolver {
  constructor(
    private readonly createVideoAuthorService: CreateVideoAuthorService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => VideoAuthor)
  async createVideoAuthor(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateVideoAuthorInput
  ) {
    const response = await this.createVideoAuthorService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
