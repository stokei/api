import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateDomainInput } from '@/controllers/graphql/inputs/domains/create-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { CreateDomainService } from '@/services/domains/create-domain';

@Resolver(() => Domain)
export class CreateDomainResolver {
  constructor(private readonly createDomainService: CreateDomainService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Domain)
  async createDomain(@Args('input') data: CreateDomainInput) {
    const response = await this.createDomainService.execute(data);
    return response;
  }
}
