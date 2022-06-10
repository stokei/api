import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdatePhoneInput } from '@/controllers/graphql/inputs/phones/update-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { UpdatePhoneService } from '@/services/phones/update-phone';

@Resolver(() => Phone)
export class UpdatePhoneResolver {
  constructor(private readonly updatePhoneService: UpdatePhoneService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Phone)
  async updatePhone(@Args('input') data: UpdatePhoneInput) {
    const response = await this.updatePhoneService.execute(data);
    return response;
  }
}
