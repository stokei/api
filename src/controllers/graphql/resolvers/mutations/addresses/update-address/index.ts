import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateAddressInput } from '@/controllers/graphql/inputs/addresses/update-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { UpdateAddressService } from '@/services/addresses/update-address';

@Resolver(() => Address)
export class UpdateAddressResolver {
  constructor(private readonly updateAddressService: UpdateAddressService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Address)
  async updateAddress(
    @Args('input') data: UpdateAddressInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateAddressService.execute(data);
    return response;
  }
}
