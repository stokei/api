import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllAnswersInput,
  WhereDataFindAllAnswersInput
} from '@/controllers/graphql/inputs/answers/find-all-answers.input';
import { Answer } from '@/controllers/graphql/types/answer';
import { Answers } from '@/controllers/graphql/types/answers';
import { FindAllAnswersService } from '@/services/answers/find-all-answers';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly findAllAnswersService: FindAllAnswersService) {}

  @Query(() => Answers)
  async answers(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllAnswersInput, nullable: true })
    where: WhereDataFindAllAnswersInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllAnswersInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllAnswersInput
  ) {
    return await this.findAllAnswersService.execute({
      page,
      where,
      orderBy
    });
  }
}
