import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { RemoveMetatagInput } from '@/controllers/graphql/inputs/metatags/remove-metatag.input';
import { Metatag } from '@/controllers/graphql/types/metatag';
import { RemoveMetatagService } from '@/services/metatags/remove-metatag';

@Resolver(() => Metatag)
export class RemoveMetatagResolver {
  constructor(private readonly removeMetatagService: RemoveMetatagService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Metatag)
  async removeMetatag(
    @Args('input') data: RemoveMetatagInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeMetatagService.execute(data);
    return response;
  }
}
