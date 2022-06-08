import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateDomainInput } from '@/controllers/graphql/inputs/domains/update-domain.input';
import { Domain } from '@/controllers/graphql/types/domain';
import { UpdateDomainService } from '@/services/domains/update-domain';

@Resolver(() => Domain)
export class UpdateDomainResolver {
  constructor(private readonly updateDomainService: UpdateDomainService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Domain)
  async updateDomain(
    @Args('input') data: UpdateDomainInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateDomainService.execute(data);
    return response;
  }
}
