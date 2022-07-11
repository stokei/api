import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateModuleVideoInput } from '@/controllers/graphql/inputs/module-videos/update-module-video.input';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';
import { UpdateModuleVideoService } from '@/services/module-videos/update-module-video';

@Resolver(() => ModuleVideo)
export class UpdateModuleVideoResolver {
  constructor(
    private readonly updateModuleVideoService: UpdateModuleVideoService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModuleVideo)
  async updateModuleVideo(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateModuleVideoInput
  ) {
    const response = await this.updateModuleVideoService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
