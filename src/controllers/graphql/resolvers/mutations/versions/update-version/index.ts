import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateVersionInput } from '@/controllers/graphql/inputs/versions/update-version.input';
import { Version } from '@/controllers/graphql/types/version';
import { UpdateVersionService } from '@/services/versions/update-version';

@Resolver(() => Version)
export class UpdateVersionResolver {
  constructor(private readonly updateVersionService: UpdateVersionService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Version)
  async updateVersion(
    @Args('input') data: UpdateVersionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateVersionService.execute(data);
    return response;
  }
}
