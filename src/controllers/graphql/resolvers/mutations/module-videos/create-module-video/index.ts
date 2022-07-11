import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateModuleVideoInput } from '@/controllers/graphql/inputs/module-videos/create-module-video.input';
import { ModuleVideo } from '@/controllers/graphql/types/module-video';
import { CreateModuleVideoService } from '@/services/module-videos/create-module-video';

@Resolver(() => ModuleVideo)
export class CreateModuleVideoResolver {
  constructor(
    private readonly createModuleVideoService: CreateModuleVideoService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModuleVideo)
  async createModuleVideo(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateModuleVideoInput
  ) {
    const response = await this.createModuleVideoService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
