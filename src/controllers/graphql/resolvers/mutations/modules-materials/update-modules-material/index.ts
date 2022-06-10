import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateModulesMaterialInput } from '@/controllers/graphql/inputs/modules-materials/update-modules-material.input';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';
import { UpdateModulesMaterialService } from '@/services/modules-materials/update-modules-material';

@Resolver(() => ModulesMaterial)
export class UpdateModulesMaterialResolver {
  constructor(
    private readonly updateModulesMaterialService: UpdateModulesMaterialService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModulesMaterial)
  async updateModulesMaterial(@Args('input') data: UpdateModulesMaterialInput) {
    const response = await this.updateModulesMaterialService.execute(data);
    return response;
  }
}
