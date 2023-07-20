import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveMaterialInput } from '@/controllers/graphql/inputs/materials/remove-material.input';
import { Material } from '@/controllers/graphql/types/material';
import { RemoveMaterialService } from '@/services/materials/remove-material';

@Resolver(() => Material)
export class RemoveMaterialResolver {
  constructor(private readonly removeMaterialService: RemoveMaterialService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Material)
  async removeMaterial(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveMaterialInput
  ) {
    const response = await this.removeMaterialService.execute({
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
