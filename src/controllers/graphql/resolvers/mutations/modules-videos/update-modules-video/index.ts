import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateModulesVideoInput } from '@/controllers/graphql/inputs/modules-videos/update-modules-video.input';
import { ModulesVideo } from '@/controllers/graphql/types/modules-video';
import { UpdateModulesVideoService } from '@/services/modules-videos/update-modules-video';

@Resolver(() => ModulesVideo)
export class UpdateModulesVideoResolver {
  constructor(
    private readonly updateModulesVideoService: UpdateModulesVideoService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModulesVideo)
  async updateModulesVideo(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateModulesVideoInput
  ) {
    const response = await this.updateModulesVideoService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
