import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { App } from '@/controllers/graphql/types/app';
import { Link } from '@/controllers/graphql/types/link';
import { CreateAppStripeAccountDashboardLinkService } from '@/services/apps/create-app-stripe-account-dashboard-link';

@Resolver(() => App)
export class CreateAppStripeDashboardLinkResolver {
  constructor(
    private readonly createAppStripeAccountDashboardLinkService: CreateAppStripeAccountDashboardLinkService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Link)
  async createAppStripeDashboardLink(@CurrentApp('id') currentAppId: string) {
    const response =
      await this.createAppStripeAccountDashboardLinkService.execute({
        app: currentAppId
      });
    return response;
  }
}
