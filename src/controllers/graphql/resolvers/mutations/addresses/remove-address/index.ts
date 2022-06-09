import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveAddressInput } from '@/controllers/graphql/inputs/addresses/remove-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { RemoveAddressService } from '@/services/addresses/remove-address';

@Resolver(() => Address)
export class RemoveAddressResolver {
  constructor(private readonly removeAddressService: RemoveAddressService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Address)
  async removeAddress(
    @Args('input') data: RemoveAddressInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeAddressService.execute(data);
    return response;
  }
}
