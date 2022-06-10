import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateVideoInput } from '@/controllers/graphql/inputs/videos/update-video.input';
import { Video } from '@/controllers/graphql/types/video';
import { UpdateVideoService } from '@/services/videos/update-video';

@Resolver(() => Video)
export class UpdateVideoResolver {
  constructor(private readonly updateVideoService: UpdateVideoService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Video)
  async updateVideo(@Args('input') data: UpdateVideoInput) {
    const response = await this.updateVideoService.execute(data);
    return response;
  }
}
