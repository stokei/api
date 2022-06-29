import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { UpdatePhoneInput } from '@/controllers/graphql/inputs/phones/update-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { UpdatePhoneService } from '@/services/phones/update-phone';

@Resolver(() => Phone)
export class UpdatePhoneResolver {
  constructor(private readonly updatePhoneService: UpdatePhoneService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Phone)
  async updatePhone(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: UpdatePhoneInput
  ) {
    const response = await this.updatePhoneService.execute({
      ...data,
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
