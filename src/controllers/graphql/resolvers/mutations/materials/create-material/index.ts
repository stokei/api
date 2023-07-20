import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateMaterialInput } from '@/controllers/graphql/inputs/materials/create-material.input';
import { Material } from '@/controllers/graphql/types/material';
import { CreateMaterialService } from '@/services/materials/create-material';

@Resolver(() => Material)
export class CreateMaterialResolver {
  constructor(private readonly createMaterialService: CreateMaterialService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Material)
  async createMaterial(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateMaterialInput
  ) {
    const response = await this.createMaterialService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
