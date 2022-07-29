import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateAddressInput } from '@/controllers/graphql/inputs/addresses/update-address.input';
import { Address } from '@/controllers/graphql/types/address';
import { UpdateAddressService } from '@/services/addresses/update-address';

@Resolver(() => Address)
export class UpdateAddressResolver {
  constructor(private readonly updateAddressService: UpdateAddressService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Address)
  async updateAddress(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateAddressInput
  ) {
    const response = await this.updateAddressService.execute({
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
