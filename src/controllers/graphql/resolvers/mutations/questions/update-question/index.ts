import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { UpdateQuestionInput } from '@/controllers/graphql/inputs/questions/update-question.input';
import { Question } from '@/controllers/graphql/types/question';
import { UpdateQuestionService } from '@/services/questions/update-question';

@Resolver(() => Question)
export class UpdateQuestionResolver {
  constructor(private readonly updateQuestionService: UpdateQuestionService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Question)
  async updateQuestion(
    @Args('input') data: UpdateQuestionInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.updateQuestionService.execute(data);
    return response;
  }
}
