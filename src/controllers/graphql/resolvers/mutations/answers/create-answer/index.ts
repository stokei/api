import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { CreateAnswerInput } from '@/controllers/graphql/inputs/answers/create-answer.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { CreateAnswerService } from '@/services/answers/create-answer';

@Resolver(() => Answer)
export class CreateAnswerResolver {
  constructor(private readonly createAnswerService: CreateAnswerService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Answer)
  async createAnswer(
    @Args('input') data: CreateAnswerInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.createAnswerService.execute(data);
    return response;
  }
}
