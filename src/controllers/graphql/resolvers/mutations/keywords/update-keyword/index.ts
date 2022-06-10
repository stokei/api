import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateKeywordInput } from '@/controllers/graphql/inputs/keywords/update-keyword.input';
import { Keyword } from '@/controllers/graphql/types/keyword';
import { UpdateKeywordService } from '@/services/keywords/update-keyword';

@Resolver(() => Keyword)
export class UpdateKeywordResolver {
  constructor(private readonly updateKeywordService: UpdateKeywordService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Keyword)
  async updateKeyword(@Args('input') data: UpdateKeywordInput) {
    const response = await this.updateKeywordService.execute(data);
    return response;
  }
}
