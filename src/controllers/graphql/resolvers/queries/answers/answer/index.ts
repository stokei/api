import { Args, Query, Resolver } from '@nestjs/graphql';

import { AnswersLoader } from '@/controllers/graphql/dataloaders/answers.loader';
import { Answer } from '@/controllers/graphql/types/answer';
import { AnswerNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(private readonly answersLoader: AnswersLoader) {}

  @Query(() => Answer)
  async answer(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const answer = await this.answersLoader.findByIds.load(id);
    if (!answer) {
      throw new AnswerNotFoundException();
    }
    return answer;
  }
}
