import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAddressInput } from '@/controllers/graphql/inputs/addresses/create-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { CreateAddressService } from '@/services/addresses/create-address';

@Resolver(() => Address)
export class CreateAddressResolver {
  constructor(private readonly createAddressService: CreateAddressService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Address)
  async createAddress(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateAddressInput
  ) {
    const response = await this.createAddressService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
