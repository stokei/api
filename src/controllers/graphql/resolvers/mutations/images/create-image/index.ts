import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateImageInput } from '@/controllers/graphql/inputs/images/create-image.input';
import { Image } from '@/controllers/graphql/types/image';
import { CreateImageService } from '@/services/images/create-image';

@Resolver(() => Image)
export class CreateImageResolver {
  constructor(private readonly createImageService: CreateImageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Image)
  async createImage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: CreateImageInput
  ) {
    const response = await this.createImageService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
