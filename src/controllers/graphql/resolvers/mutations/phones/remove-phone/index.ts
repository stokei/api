import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { RemovePhoneInput } from '@/controllers/graphql/inputs/phones/remove-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { RemovePhoneService } from '@/services/phones/remove-phone';

@Resolver(() => Phone)
export class RemovePhoneResolver {
  constructor(private readonly removePhoneService: RemovePhoneService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Phone)
  async removePhone(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemovePhoneInput
  ) {
    const response = await this.removePhoneService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
