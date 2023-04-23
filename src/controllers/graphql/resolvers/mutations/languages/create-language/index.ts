import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { CreateLanguageInput } from '@/controllers/graphql/inputs/languages/create-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { CreateLanguageService } from '@/services/languages/create-language';

@Resolver(() => Language)
export class CreateLanguageResolver {
  constructor(private readonly createLanguageService: CreateLanguageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Language)
  async createLanguage(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: CreateLanguageInput
  ) {
    const response = await this.createLanguageService.execute({
      ...data,
      createdBy: currentAccountId
    });
    return response;
  }
}
