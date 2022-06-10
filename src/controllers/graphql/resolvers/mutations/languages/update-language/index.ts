import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateLanguageInput } from '@/controllers/graphql/inputs/languages/update-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { UpdateLanguageService } from '@/services/languages/update-language';

@Resolver(() => Language)
export class UpdateLanguageResolver {
  constructor(private readonly updateLanguageService: UpdateLanguageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Language)
  async updateLanguage(@Args('input') data: UpdateLanguageInput) {
    const response = await this.updateLanguageService.execute(data);
    return response;
  }
}
