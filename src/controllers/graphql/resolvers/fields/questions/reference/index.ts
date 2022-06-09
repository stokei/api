import { Resolver, ResolveReference } from '@nestjs/graphql';

import { QuestionsLoader } from '@/controllers/graphql/dataloaders/questions.loader';
import { Question } from '@/controllers/graphql/types/question';

@Resolver(() => Question)
export class QuestionReferenceResolver {
  constructor(private readonly questionsLoader: QuestionsLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.questionsLoader.findByIds.load(reference.id);
  }
}
