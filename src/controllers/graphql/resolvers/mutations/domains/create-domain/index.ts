import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppConfig } from '@/common/decorators/app-config.decorator';
import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { CreateDomainInput } from '@/controllers/graphql/inputs/domains/create-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { CreateDomainService } from '@/services/domains/create-domain';

@Resolver(() => Domain)
export class CreateDomainResolver {
  constructor(private readonly createDomainService: CreateDomainService) {}

  @AppConfig({
    isAllowedToUsePlan: true,
    isRequired: true
  })
  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Domain)
  async createDomain(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateDomainInput
  ) {
    const response = await this.createDomainService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
