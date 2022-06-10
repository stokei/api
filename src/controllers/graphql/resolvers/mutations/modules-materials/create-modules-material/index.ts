import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateModulesMaterialInput } from '@/controllers/graphql/inputs/modules-materials/create-modules-material.input';
import { ModulesMaterial } from '@/controllers/graphql/types/modules-material';
import { CreateModulesMaterialService } from '@/services/modules-materials/create-modules-material';

@Resolver(() => ModulesMaterial)
export class CreateModulesMaterialResolver {
  constructor(
    private readonly createModulesMaterialService: CreateModulesMaterialService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => ModulesMaterial)
  async createModulesMaterial(@Args('input') data: CreateModulesMaterialInput) {
    const response = await this.createModulesMaterialService.execute(data);
    return response;
  }
}
