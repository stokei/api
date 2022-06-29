import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateImageInput } from '@/controllers/graphql/inputs/images/update-image.input';
import { Image } from '@/controllers/graphql/types/image';
import { UpdateImageService } from '@/services/images/update-image';

@Resolver(() => Image)
export class UpdateImageResolver {
  constructor(private readonly updateImageService: UpdateImageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Image)
  async updateImage(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateImageInput
  ) {
    const response = await this.updateImageService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
