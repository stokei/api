import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemoveAddressInput } from '@/controllers/graphql/inputs/addresses/remove-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { RemoveAddressService } from '@/services/addresses/remove-address';

@Resolver(() => Address)
export class RemoveAddressResolver {
  constructor(private readonly removeAddressService: RemoveAddressService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Address)
  async removeAddress(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveAddressInput
  ) {
    const response = await this.removeAddressService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
