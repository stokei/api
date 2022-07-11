import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveModuleVideoInput } from '@/controllers/graphql/inputs/module-videos/remove-module-video.input';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';
import { RemoveModuleVideoService } from '@/services/module-videos/remove-module-video';

@Resolver(() => ModuleVideo)
export class RemoveModuleVideoResolver {
  constructor(
    private readonly removeModuleVideoService: RemoveModuleVideoService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModuleVideo)
  async removeModuleVideo(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveModuleVideoInput
  ) {
    const response = await this.removeModuleVideoService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
