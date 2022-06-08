import { Resolver, ResolveReference } from '@nestjs/graphql';
import { AnswersLoader } from '@/controllers/graphql/dataloaders/answers.loader';
import { Answer } from '@/controllers/graphql/types/answer';

@Resolver(() => Answer)
export class AnswerReferenceResolver {
  constructor(private readonly answersLoader: AnswersLoader) {}

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: string }) {
    return this.answersLoader.findByIds.load(reference.id);
  }
}
