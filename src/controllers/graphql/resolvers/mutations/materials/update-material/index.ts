import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateMaterialInput } from '@/controllers/graphql/inputs/materials/update-material.input';
import { Material } from '@/controllers/graphql/types/material';
import { UpdateMaterialService } from '@/services/materials/update-material';

@Resolver(() => Material)
export class UpdateMaterialResolver {
  constructor(private readonly updateMaterialService: UpdateMaterialService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Material)
  async updateMaterial(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateMaterialInput
  ) {
    const response = await this.updateMaterialService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
