import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreatePhoneInput } from '@/controllers/graphql/inputs/phones/create-phone.input';
import { Phone } from '@/controllers/graphql/types/phone';
import { CreatePhoneService } from '@/services/phones/create-phone';

@Resolver(() => Phone)
export class CreatePhoneResolver {
  constructor(private readonly createPhoneService: CreatePhoneService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Phone)
  async createPhone(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreatePhoneInput
  ) {
    const response = await this.createPhoneService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
