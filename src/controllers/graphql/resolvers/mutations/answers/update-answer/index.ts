import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { UpdateAnswerInput } from '@/controllers/graphql/inputs/answers/update-answer.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { UpdateAnswerService } from '@/services/answers/update-answer';

@Resolver(() => Answer)
export class UpdateAnswerResolver {
  constructor(private readonly updateAnswerService: UpdateAnswerService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Answer)
  async updateAnswer(@Args('input') data: UpdateAnswerInput) {
    const response = await this.updateAnswerService.execute(data);
    return response;
  }
}
