import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateMetatagInput } from '@/controllers/graphql/inputs/metatags/create-metatag.input';
import { Metatag } from '@/controllers/graphql/types/metatag';
import { CreateMetatagService } from '@/services/metatags/create-metatag';

@Resolver(() => Metatag)
export class CreateMetatagResolver {
  constructor(private readonly createMetatagService: CreateMetatagService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Metatag)
  async createMetatag(
    @Args('input') data: CreateMetatagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createMetatagService.execute(data);
    return response;
  }
}
