import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreateAddressInput } from '@/controllers/graphql/inputs/addresses/create-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { CreateAddressService } from '@/services/addresses/create-address';

@Resolver(() => Address)
export class CreateAddressResolver {
  constructor(private readonly createAddressService: CreateAddressService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Address)
  async createAddress(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateAddressInput
  ) {
    const response = await this.createAddressService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
