import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthenticatedGuard } from '@stokei/nestjs';

import { RemoveAnswerInput } from '@/controllers/graphql/inputs/answers/remove-answer.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { RemoveAnswerService } from '@/services/answers/remove-answer';

@Resolver(() => Answer)
export class RemoveAnswerResolver {
  constructor(private readonly removeAnswerService: RemoveAnswerService) {}

  @UseGuards(AuthenticatedGuard)
  @Mutation(() => Answer)
  async removeAnswer(@Args('input') data: RemoveAnswerInput) {
    const response = await this.removeAnswerService.execute(data);
    return response;
  }
}
