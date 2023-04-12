import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PaginationInput } from '@stokei/nestjs';

import { OrderByDataFindAllVideoAuthorsInput } from '@/controllers/graphql/inputs/video-authors/find-all-video-authors.input';
import { Video } from '@/controllers/graphql/types/video';
import { VideoAuthors } from '@/controllers/graphql/types/video-authors';
import { VideoModel } from '@/models/video.model';
import { FindAllVideoAuthorsService } from '@/services/video-authors/find-all-video-authors';

@Resolver(() => Video)
export class VideoVideoAuthorsResolver {
  constructor(
    private readonly findAllVideoAuthorsService: FindAllVideoAuthorsService
  ) {}

  @ResolveField(() => VideoAuthors, { nullable: true })
  authors(
    @Args('page', { type: () => PaginationInput, nullable: true })
    page: PaginationInput,
    @Args('orderBy', {
      type: () => OrderByDataFindAllVideoAuthorsInput,
      nullable: true
    })
    orderBy: OrderByDataFindAllVideoAuthorsInput,
    @Parent() video: VideoModel
  ) {
    return this.findAllVideoAuthorsService.execute({
      page,
      orderBy,
      where: {
        AND: {
          video: {
            equals: video.id
          }
        }
      }
    });
  }
}
