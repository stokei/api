import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
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
    @CurrentApp('id') appId: string,
    @Args('input') data: CreateLanguageInput
  ) {
    const response = await this.createLanguageService.execute({
      ...data,
      app: appId,
      createdBy: currentAccountId
    });
    return response;
  }
}
