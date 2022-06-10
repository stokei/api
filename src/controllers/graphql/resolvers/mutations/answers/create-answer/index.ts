import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateAnswerInput } from '@/controllers/graphql/inputs/answers/create-answer.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { CreateAnswerService } from '@/services/answers/create-answer';

@Resolver(() => Answer)
export class CreateAnswerResolver {
  constructor(private readonly createAnswerService: CreateAnswerService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Answer)
  async createAnswer(@Args('input') data: CreateAnswerInput) {
    const response = await this.createAnswerService.execute(data);
    return response;
  }
}
