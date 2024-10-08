import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard, CurrentAccount } from '@stokei/nestjs';

import { AppGuard } from '@/common/guards/app';
import { RemoveLanguageInput } from '@/controllers/graphql/inputs/languages/remove-language.input';
import { Language } from '@/controllers/graphql/types/language';
import { RemoveLanguageService } from '@/services/languages/remove-language';

@Resolver(() => Language)
export class RemoveLanguageResolver {
  constructor(private readonly removeLanguageService: RemoveLanguageService) {}

  @UseGuards(AuthenticatedGuard, AppGuard)
  @Mutation(() => Language)
  async removeLanguage(
    @CurrentAccount('id') currentAccountId: string,
    @Args('input') data: RemoveLanguageInput
  ) {
    const response = await this.removeLanguageService.execute({
      ...data,
      where: {
        ...data?.where,
        removedBy: currentAccountId
      }
    });
    return response;
  }
}
