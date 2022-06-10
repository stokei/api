import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateDomainInput } from '@/controllers/graphql/inputs/domains/update-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { UpdateDomainService } from '@/services/domains/update-domain';

@Resolver(() => Domain)
export class UpdateDomainResolver {
  constructor(private readonly updateDomainService: UpdateDomainService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Domain)
  async updateDomain(@Args('input') data: UpdateDomainInput) {
    const response = await this.updateDomainService.execute(data);
    return response;
  }
}
