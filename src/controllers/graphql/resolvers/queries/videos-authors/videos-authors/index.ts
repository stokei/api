import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosAuthorsInput,
  WhereDataFindAllVideosAuthorsInput
} from '@/controllers/graphql/inputs/videos-authors/find-all-videos-authors.input';
import { VideosAuthor } from '@/controllers/graphql/types/videos-author';
import { VideosAuthors } from '@/controllers/graphql/types/videos-authors';
import { FindAllVideosAuthorsService } from '@/services/videos-authors/find-all-videos-authors';

@Resolver(() => VideosAuthor)
export class VideosAuthorsResolver {
  constructor(
    private readonly findAllVideosAuthorsService: FindAllVideosAuthorsService
  ) {}

  @Query(() => VideosAuthors)
  async videosAuthors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVideosAuthorsInput,
      nullable: true
    })
    where: WhereDataFindAllVideosAuthorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosAuthorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosAuthorsInput
  ) {
    return await this.findAllVideosAuthorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
