import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllVideoAuthorsInput,
  WhereDataFindAllVideoAuthorsInput
} from '@/controllers/graphql/inputs/video-authors/find-all-video-authors.input';
import { VideoAuthor } from '@/controllers/graphql/types/video-author';
import { VideoAuthors } from '@/controllers/graphql/types/video-authors';
import { FindAllVideoAuthorsService } from '@/services/video-authors/find-all-video-authors';

@Resolver(() => VideoAuthor)
export class VideoAuthorsResolver {
  constructor(
    private readonly findAllVideoAuthorsService: FindAllVideoAuthorsService
  ) {}

  @Query(() => VideoAuthors)
  async videoAuthors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVideoAuthorsInput,
      nullable: true
    })
    where: WhereDataFindAllVideoAuthorsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideoAuthorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideoAuthorsInput
  ) {
    return await this.findAllVideoAuthorsService.execute({
      page,
      where,
      orderBy
    });
  }
}
