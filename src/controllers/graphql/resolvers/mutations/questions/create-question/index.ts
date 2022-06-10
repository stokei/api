import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { CreateQuestionInput } from '@/controllers/graphql/inputs/questions/create-question.input';
import { Question } from '@/controllers/graphql/types/question';
import { CreateQuestionService } from '@/services/questions/create-question';

@Resolver(() => Question)
export class CreateQuestionResolver {
  constructor(private readonly createQuestionService: CreateQuestionService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Question)
  async createQuestion(@Args('input') data: CreateQuestionInput) {
    const response = await this.createQuestionService.execute(data);
    return response;
  }
}
