import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllCommentsInput,
  WhereDataFindAllCommentsInput
} from '@/controllers/graphql/inputs/comments/find-all-comments.input';
import { Comment } from '@/controllers/graphql/types/comment';
import { Comments } from '@/controllers/graphql/types/comments';
import { FindAllCommentsService } from '@/services/comments/find-all-comments';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(
    private readonly findAllCommentsService: FindAllCommentsService
  ) {}

  @Query(() => Comments)
  async comments(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllCommentsInput,
      nullable: true
    })
    where: WhereDataFindAllCommentsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllCommentsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllCommentsInput
  ) {
    return await this.findAllCommentsService.execute({
      page,
      where,
      orderBy
    });
  }
}
