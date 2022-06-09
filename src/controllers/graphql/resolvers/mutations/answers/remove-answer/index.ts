import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentProject, ProjectConfig, ProjectGuard } from '@stokei/nestjs';

import { RemoveAnswerInput } from '@/controllers/graphql/inputs/answers/remove-answer.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { RemoveAnswerService } from '@/services/answers/remove-answer';

@Resolver(() => Answer)
export class RemoveAnswerResolver {
  constructor(private readonly removeAnswerService: RemoveAnswerService) {}

  @UseGuards(ProjectGuard)
  @ProjectConfig()
  @Mutation(() => Answer)
  async removeAnswer(
    @Args('input') data: RemoveAnswerInput,
    @CurrentProject('id') projectId: string
  ) {
    const response = await this.removeAnswerService.execute(data);
    return response;
  }
}
