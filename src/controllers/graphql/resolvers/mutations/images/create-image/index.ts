import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateImageInput } from '@/controllers/graphql/inputs/images/create-image.input';
import { Image } from '@/controllers/graphql/types/image';
import { CreateImageService } from '@/services/images/create-image';

@Resolver(() => Image)
export class CreateImageResolver {
  constructor(private readonly createImageService: CreateImageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Image)
  async createImage(@Args('input') data: CreateImageInput) {
    const response = await this.createImageService.execute(data);
    return response;
  }
}
