import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllQuestionsInput,
  WhereDataFindAllQuestionsInput
} from '@/controllers/graphql/inputs/questions/find-all-questions.input';
import { Question } from '@/controllers/graphql/types/question';
import { Questions } from '@/controllers/graphql/types/questions';
import { FindAllQuestionsService } from '@/services/questions/find-all-questions';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(
    private readonly findAllQuestionsService: FindAllQuestionsService
  ) {}

  @Query(() => Questions)
  async questions(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllQuestionsInput,
      nullable: true
    })
    where: WhereDataFindAllQuestionsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllQuestionsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllQuestionsInput
  ) {
    return await this.findAllQuestionsService.execute({
      page,
      where,
      orderBy
    });
  }
}
