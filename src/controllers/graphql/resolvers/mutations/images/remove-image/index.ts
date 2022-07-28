import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveImageInput } from '@/controllers/graphql/inputs/images/remove-image.input';
import { Image } from '@/controllers/graphql/types/image';
import { RemoveImageService } from '@/services/images/remove-image';

@Resolver(() => Image)
export class RemoveImageResolver {
  constructor(private readonly removeImageService: RemoveImageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Image)
  async removeImage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,,
    @Args('input') data: RemoveImageInput
  ) {
    const response = await this.removeImageService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
