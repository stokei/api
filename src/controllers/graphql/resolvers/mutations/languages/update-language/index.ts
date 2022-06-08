import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';
import { UpdateLanguageInput } from '@/controllers/graphql/inputs/languages/update-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { UpdateLanguageService } from '@/services/languages/update-language';

@Resolver(() => Language)
export class UpdateLanguageResolver {
  constructor(private readonly updateLanguageService: UpdateLanguageService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Language)
  async updateLanguage(
    @Args('input') data: UpdateLanguageInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateLanguageService.execute(data);
    return response;
  }
}
