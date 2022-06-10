import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateKeywordInput } from '@/controllers/graphql/inputs/keywords/create-keyword.input';
import { Keyword } from '@/controllers/graphql/types/keyword';
import { CreateKeywordService } from '@/services/keywords/create-keyword';

@Resolver(() => Keyword)
export class CreateKeywordResolver {
  constructor(private readonly createKeywordService: CreateKeywordService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Keyword)
  async createKeyword(@Args('input') data: CreateKeywordInput) {
    const response = await this.createKeywordService.execute(data);
    return response;
  }
}
