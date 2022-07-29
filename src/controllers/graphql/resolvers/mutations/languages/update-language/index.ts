import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { CurrentApp } from '@/common/decorators/currenty-app.decorator';
import { AppGuard } from '@/common/guards/app';
import { UpdateLanguageInput } from '@/controllers/graphql/inputs/languages/update-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { UpdateLanguageService } from '@/services/languages/update-language';

@Resolver(() => Language)
export class UpdateLanguageResolver {
  constructor(private readonly updateLanguageService: UpdateLanguageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Language)
  async updateLanguage(
    @CurrentAccount('id') currentAccountId: string,
    @CurrentApp('id') appId: string,
    @Args('input') data: UpdateLanguageInput
  ) {
    const response = await this.updateLanguageService.execute({
      where: {
        ...data?.where,
        app: appId
      },
      data: {
        ...data?.data,
        updatedBy: currentAccountId
      }
    });
    return response;
  }
}
