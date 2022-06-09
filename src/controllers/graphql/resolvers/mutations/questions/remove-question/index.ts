import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveQuestionInput } from '@/controllers/graphql/inputs/questions/remove-question.input';
import { Question } from '@/controllers/graphql/types/question';
import { RemoveQuestionService } from '@/services/questions/remove-question';

@Resolver(() => Question)
export class RemoveQuestionResolver {
  constructor(private readonly removeQuestionService: RemoveQuestionService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Question)
  async removeQuestion(
    @Args('input') data: RemoveQuestionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeQuestionService.execute(data);
    return response;
  }
}
