import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveImageInput } from '@/controllers/graphql/inputs/images/remove-image.input';
import { Image } from '@/controllers/graphql/types/image';
import { RemoveImageService } from '@/services/images/remove-image';

@Resolver(() => Image)
export class RemoveImageResolver {
  constructor(private readonly removeImageService: RemoveImageService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Image)
  async removeImage(
    @Args('input') data: RemoveImageInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeImageService.execute(data);
    return response;
  }
}
