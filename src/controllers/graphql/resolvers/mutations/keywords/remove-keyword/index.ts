import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveKeywordInput } from '@/controllers/graphql/inputs/keywords/remove-keyword.input';
import { Keyword } from '@/controllers/graphql/types/keyword';
import { RemoveKeywordService } from '@/services/keywords/remove-keyword';

@Resolver(() => Keyword)
export class RemoveKeywordResolver {
  constructor(private readonly removeKeywordService: RemoveKeywordService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Keyword)
  async removeKeyword(@Args('input') data: RemoveKeywordInput) {
    const response = await this.removeKeywordService.execute(data);
    return response;
  }
}
