import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosTagsInput,
  WhereDataFindAllVideosTagsInput
} from '@/controllers/graphql/inputs/videos-tags/find-all-videos-tags.input';
import { VideosTag } from '@/controllers/graphql/types/videos-tag';
import { VideosTags } from '@/controllers/graphql/types/videos-tags';
import { FindAllVideosTagsService } from '@/services/videos-tags/find-all-videos-tags';

@Resolver(() => VideosTag)
export class VideosTagsResolver {
  constructor(
    private readonly findAllVideosTagsService: FindAllVideosTagsService
  ) {}

  @Query(() => VideosTags)
  async videosTags(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVideosTagsInput,
      nullable: true
    })
    where: WhereDataFindAllVideosTagsInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosTagsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosTagsInput
  ) {
    return await this.findAllVideosTagsService.execute({
      page,
      where,
      orderBy
    });
  }
}
