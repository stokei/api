import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CreatePhoneInput } from '@/controllers/graphql/inputs/phones/create-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { CreatePhoneService } from '@/services/phones/create-phone';

@Resolver(() => Phone)
export class CreatePhoneResolver {
  constructor(private readonly createPhoneService: CreatePhoneService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Phone)
  async createPhone(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreatePhoneInput
  ) {
    const response = await this.createPhoneService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
