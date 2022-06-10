import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateLanguageInput } from '@/controllers/graphql/inputs/languages/create-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { CreateLanguageService } from '@/services/languages/create-language';

@Resolver(() => Language)
export class CreateLanguageResolver {
  constructor(private readonly createLanguageService: CreateLanguageService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Language)
  async createLanguage(@Args('input') data: CreateLanguageInput) {
    const response = await this.createLanguageService.execute(data);
    return response;
  }
}
