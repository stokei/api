import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateVideoInput } from '@/controllers/graphql/inputs/videos/create-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { CreateVideoService } from '@/services/videos/create-video';

@Resolver(() => Video)
export class CreateVideoResolver {
  constructor(private readonly createVideoService: CreateVideoService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Video)
  async createVideo(@Args('input') data: CreateVideoInput) {
    const response = await this.createVideoService.execute(data);
    return response;
  }
}
