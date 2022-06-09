import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveVersionInput } from '@/controllers/graphql/inputs/versions/remove-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { RemoveVersionService } from '@/services/versions/remove-version';

@Resolver(() => Version)
export class RemoveVersionResolver {
  constructor(private readonly removeVersionService: RemoveVersionService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Version)
  async removeVersion(
    @Args('input') data: RemoveVersionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeVersionService.execute(data);
    return response;
  }
}
