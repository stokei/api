import { Args, Query, Resolver } from '@nestjs/graphql';
import { QuestionsLoader } from '@/controllers/graphql/dataloaders/questions.loader';
import { Question } from '@/controllers/graphql/types/question';
import { QuestionNotFoundException, ParamNotFoundException } from '@/errors';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionsLoader: QuestionsLoader) {}

  @Query(() => Question)
  async question(@Args('id') id: string) {
    if (!id) {
      throw new ParamNotFoundException('id');
    }
    const question = await this.questionsLoader.findByIds.load(id);
    if (!question) {
      throw new QuestionNotFoundException();
    }
    return question;
  }
}
