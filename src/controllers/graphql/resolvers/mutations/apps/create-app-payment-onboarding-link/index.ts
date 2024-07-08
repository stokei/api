import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateAppPaymentOnboardingLinkInput } from '@/controllers/graphql/inputs/apps/create-app-payment-onboarding-link.input';
import { App } from '@/controllers/graphql/types/app';
import { Link } from '@/controllers/graphql/types/link';
import { CreateAppPaymentOnboardingLinkService } from '@/services/apps/create-app-payment-onboarding-link';

@Resolver(() => App)
export class CreateAppPaymentOnboardingLinkResolver {
  constructor(
    private readonly createAppPaymentOnboardingLinkService: CreateAppPaymentOnboardingLinkService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Link)
  async createAppPaymentOnboardingLink(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string,
    @Args('input') data: CreateAppPaymentOnboardingLinkInput
  ) {
    const response = await this.createAppPaymentOnboardingLinkService.execute({
      ...data,
      app: currentAppId,
      createdBy: currentAccountId
    });
    return response;
  }
}
