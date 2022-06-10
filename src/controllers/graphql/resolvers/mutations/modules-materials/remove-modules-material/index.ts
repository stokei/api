import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveModulesMaterialInput } from '@/controllers/graphql/inputs/modules-materials/remove-modules-material.input';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';
import { RemoveModulesMaterialService } from '@/services/modules-materials/remove-modules-material';

@Resolver(() => ModulesMaterial)
export class RemoveModulesMaterialResolver {
  constructor(
    private readonly removeModulesMaterialService: RemoveModulesMaterialService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModulesMaterial)
  async removeModulesMaterial(@Args('input') data: RemoveModulesMaterialInput) {
    const response = await this.removeModulesMaterialService.execute(data);
    return response;
  }
}
