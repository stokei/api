import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import {
  OrderByDataFindAllVideosSubtitlesInput,
  WhereDataFindAllVideosSubtitlesInput
} from '@/controllers/graphql/inputs/videos-subtitles/find-all-videos-subtitles.input';
import { VideosSubtitle } from '@/controllers/graphql/types/videos-subtitle';
import { VideosSubtitles } from '@/controllers/graphql/types/videos-subtitles';
import { FindAllVideosSubtitlesService } from '@/services/videos-subtitles/find-all-videos-subtitles';

@Resolver(() => VideosSubtitle)
export class VideosSubtitlesResolver {
  constructor(
    private readonly findAllVideosSubtitlesService: FindAllVideosSubtitlesService
  ) {}

  @Query(() => VideosSubtitles)
  async videosSubtitles(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', {
      type: () => WhereDataFindAllVideosSubtitlesInput,
      nullable: true
    })
    where: WhereDataFindAllVideosSubtitlesInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosSubtitlesInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosSubtitlesInput
  ) {
    return await this.findAllVideosSubtitlesService.execute({
      page,
      where,
      orderBy
    });
  }
}
