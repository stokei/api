import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveDomainInput } from '@/controllers/graphql/inputs/domains/remove-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { RemoveDomainService } from '@/services/domains/remove-domain';

@Resolver(() => Domain)
export class RemoveDomainResolver {
  constructor(private readonly removeDomainService: RemoveDomainService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Domain)
  async removeDomain(@Args('input') data: RemoveDomainInput) {
    const response = await this.removeDomainService.execute(data);
    return response;
  }
}
