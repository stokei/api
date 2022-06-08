import { Args, Query, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';
import {
  OrderByDataFindAllVideosInput,
  WhereDataFindAllVideosInput
} from '@/controllers/graphql/inputs/videos/find-all-videos.input';
import { Video } from '@/controllers/graphql/types/video';
import { Videos } from '@/controllers/graphql/types/videos';
import { FindAllVideosService } from '@/services/videos/find-all-videos';

@Resolver(() => Video)
export class VideosResolver {
  constructor(private readonly findAllVideosService: FindAllVideosService) {}

  @Query(() => Videos)
  async videos(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('where', { type: () => WhereDataFindAllVideosInput, nullable: true })
    where: WhereDataFindAllVideosInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideosInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideosInput
  ) {
    return await this.findAllVideosService.execute({
      page,
      where,
      orderBy
    });
  }
}
