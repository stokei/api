import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateCustomerPortalSessionInput } from '@/controllers/graphql/inputs/customer-portal-sessions/create-customer-portal-session.input';
import { CustomerPortalSession } from '@/controllers/graphql/types/customer-portal-session';
import { CreateCustomerPortalSessionService } from '@/services/customer-portal-sessions/create-customer-portal-session';

@Resolver(() => CustomerPortalSession)
export class CreateCustomerPortalSessionResolver {
  constructor(
    private readonly createCustomerPortalSessionService: CreateCustomerPortalSessionService
  ) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => CustomerPortalSession)
  async createCustomerPortalSession(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') currentAppCurrentAppId: string,
    @Args('input') data: CreateCustomerPortalSessionInput
  ) {
    const response = await this.createCustomerPortalSessionService.execute({
      ...data,
      customer: data.app || currentAccountId,
      app: currentAppCurrentAppId
    });
    return response;
  }
}
