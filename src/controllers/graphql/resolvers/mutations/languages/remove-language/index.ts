import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveLanguageInput } from '@/controllers/graphql/inputs/languages/remove-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { RemoveLanguageService } from '@/services/languages/remove-language';

@Resolver(() => Language)
export class RemoveLanguageResolver {
  constructor(private readonly removeLanguageService: RemoveLanguageService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Language)
  async removeLanguage(
    @Args('input') data: RemoveLanguageInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeLanguageService.execute(data);
    return response;
  }
}
