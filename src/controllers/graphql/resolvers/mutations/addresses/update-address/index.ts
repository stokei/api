import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdateAddressInput } from '@/controllers/graphql/inputs/addresses/update-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { UpdateAddressService } from '@/services/addresses/update-address';

@Resolver(() => Address)
export class UpdateAddressResolver {
  constructor(private readonly updateAddressService: UpdateAddressService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Address)
  async updateAddress(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdateAddressInput
  ) {
    const response = await this.updateAddressService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
