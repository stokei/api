import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateMetatagInput } from '@/controllers/graphql/inputs/metatags/update-metatag.input';
import { Metatag } from '@/controllers/graphql/types/metatag';
import { UpdateMetatagService } from '@/services/metatags/update-metatag';

@Resolver(() => Metatag)
export class UpdateMetatagResolver {
  constructor(private readonly updateMetatagService: UpdateMetatagService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Metatag)
  async updateMetatag(
    @Args('input') data: UpdateMetatagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateMetatagService.execute(data);
    return response;
  }
}
