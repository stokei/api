import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { Billing } from '@/controllers/graphql/types/billing';
import { FindAppBillingService } from '@/services/apps/find-app-billing';

@Resolver(() => Billing)
export class BillingResolver {
  constructor(private readonly findAppBillingService: FindAppBillingService) {}

  @UseGuards(AppGuard, AuthenticatedGuard)
  @Query(() => Billing)
  async billing(@CurrentApp('id') appId: string) {
    return await this.findAppBillingService.execute({
      app: appId
    });
  }
}
