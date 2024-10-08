import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { RemoveDomainInput } from '@/controllers/graphql/inputs/domains/remove-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { RemoveDomainService } from '@/services/domains/remove-domain';

@Resolver(() => Domain)
export class RemoveDomainResolver {
  constructor(private readonly removeDomainService: RemoveDomainService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Domain)
  async removeDomain(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: RemoveDomainInput
  ) {
    const response = await this.removeDomainService.execute({
      ...data,
      where: {
        ...data?.where,
        app: appId,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
