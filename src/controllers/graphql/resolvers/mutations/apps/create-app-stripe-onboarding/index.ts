import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { App } from '@/controllers/graphql/types/app';
import { Link } from '@/controllers/graphql/types/link';
import { CreateAppStripeAccountOnboardingLinkService } from '@/services/apps/create-app-stripe-account-onboarding-link';

@Resolver(() => App)
export class CreateAppStripeOnboardingResolver {
  constructor(
    private readonly createAppStripeAccountOnboardingLinkService: CreateAppStripeAccountOnboardingLinkService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Link)
  async createAppStripeOnboarding(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppId: string
  ) {
    const response =
      await this.createAppStripeAccountOnboardingLinkService.execute({
        app: currentAppId,
        createdBy: currentAccountId
      });
    return response;
  }
}
